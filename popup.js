document.addEventListener("DOMContentLoaded", () => {

    // Get HTML elements
    const percentageEl = document.getElementById("percentage");
    const totalEl = document.getElementById("total");
    const presentEl = document.getElementById("present");
    const absentEl = document.getElementById("absent");
    const bunkEl = document.getElementById("bunk-count");
    const progressEl = document.getElementById("progress");

    const semesterInput = document.getElementById("semester-total");
    const semesterResult = document.getElementById("semester-result");
    const refreshBtn = document.getElementById("refresh");

    const REQUIRED_PERCENTAGE = 75;

    let attendanceData = null;

    // Calculate current bunk allowance
    function calculateCurrentBunks(data) {

        const { totalClasses, present } = data;

        const maxAbsences = Math.floor(
            totalClasses * (100 - REQUIRED_PERCENTAGE) / 100
        );

        const alreadyAbsent = totalClasses - present;

        return Math.max(0, maxAbsences - alreadyAbsent);
    }

    // Update attendance dashboard
    function updateUI(data) {

        attendanceData = data;

        const {
            totalClasses,
            present,
            absent,
            percentage
        } = data;

        percentageEl.innerText = percentage.toFixed(2) + "%";

        totalEl.innerText = totalClasses;
        presentEl.innerText = present;
        absentEl.innerText = absent;

        progressEl.style.width = percentage + "%";

        // Current bunk allowance
        const bunkCount = calculateCurrentBunks(data);

        bunkEl.innerText = bunkCount;

        // Update semester prediction
        calculateSemesterPrediction();
    }

    // Calculate remaining semester bunk allowance
    function calculateSemesterPrediction() {

        if (!attendanceData) return;

        const expectedTotal = Number(semesterInput.value);

        if (!expectedTotal) {

            semesterResult.innerText =
                "Enter expected semester classes to predict.";

            return;
        }

        const { totalClasses, present } = attendanceData;

        if (expectedTotal < totalClasses) {

            semesterResult.innerText =
                "Expected total cannot be less than classes conducted.";

            return;
        }

        const requiredClasses = Math.ceil(
            expectedTotal * REQUIRED_PERCENTAGE / 100
        );

        const remainingClasses = expectedTotal - totalClasses;

        const futureClassesToAttend = Math.max(
            0,
            requiredClasses - present
        );

        if (futureClassesToAttend > remainingClasses) {

            semesterResult.innerText =
                "75% attendance is no longer achievable.";

            return;
        }

        const futureBunks =
            remainingClasses - futureClassesToAttend;

        semesterResult.innerText =
            `You can miss ${futureBunks} more classes this semester.`;
    }

    // Fetch attendance from Vasavi ERP
    async function fetchAttendance() {

        try {

            const [tab] = await chrome.tabs.query({
                active: true,
                currentWindow: true
            });

            if (!tab || !tab.id) {
                throw new Error("No active tab found.");
            }

            if (!tab.url.startsWith("https://erp.vce.ac.in/")) {
                throw new Error(
                    "Please open your Vasavi ERP attendance page."
                );
            }

            const response = await chrome.tabs.sendMessage(
                tab.id,
                { action: "GET_ATTENDANCE" }
            );

            if (!response || !response.success || !response.data) {
                throw new Error(
                    response?.error || "Attendance data unavailable."
                );
            }

            // Validate data
            const data = response.data;

            if (
                !Number.isFinite(data.totalClasses) ||
                !Number.isFinite(data.present) ||
                !Number.isFinite(data.absent) ||
                !Number.isFinite(data.percentage) ||
                data.totalClasses <= 0 ||
                data.present < 0 ||
                data.present > data.totalClasses
            ) {
                throw new Error("Invalid attendance values received.");
            }

            updateUI(data);

        } catch (error) {

            console.error("FETCH ERROR:", error);

            percentageEl.innerText = "--%";
            totalEl.innerText = "--";
            presentEl.innerText = "--";
            absentEl.innerText = "--";
            bunkEl.innerText = "--";

            progressEl.style.width = "0%";

            semesterResult.innerText = error.message;
        }
    }

    // Refresh attendance button
    refreshBtn.addEventListener("click", fetchAttendance);

    // Recalculate when semester total changes
    semesterInput.addEventListener(
        "input",
        calculateSemesterPrediction
    );

    // Initial attendance fetch
    fetchAttendance();

});