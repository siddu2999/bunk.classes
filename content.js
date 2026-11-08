chrome.runtime.onMessage.addListener(
    (request, sender, sendResponse) => {

        if (request.action === "GET_ATTENDANCE") {
            try {

                // Get all tables from the webpage
                const tables = [
                    ...document.querySelectorAll("table")
                ];

                // Find the overall attendance summary table
                const attendanceTable = tables.find(table => {

                    const text = table.innerText.toLowerCase();

                    return text.includes("total classes") &&
                           text.includes("total attendance") &&
                           text.includes("presentees");
                });

                if (!attendanceTable) {
                    throw new Error("Attendance table not found.");
                }

                // Extract rows
                const rows = [
                    ...attendanceTable.querySelectorAll("tr")
                ];

                // Find Regular attendance row
                const regularRow = rows
                    .map(row =>
                        [...row.querySelectorAll("td, th")]
                            .map(cell => cell.innerText.trim())
                    )
                    .find(cells => cells[1] === "Regular");

                if (!regularRow) {
                    throw new Error("Regular attendance row not found.");
                }

                // Extract attendance values
                const attendanceData = {

                    totalClasses: Number(regularRow[2]),

                    present: Number(regularRow[3]),

                    extraClasses: Number(regularRow[4]),

                    absent: Number(regularRow[5]),

                    percentage: Number(regularRow[6])

                };

                // Validate extracted data
                if (
                    !Number.isFinite(attendanceData.totalClasses) ||
                    !Number.isFinite(attendanceData.present) ||
                    !Number.isFinite(attendanceData.absent)
                ) {
                    throw new Error("Invalid attendance data.");
                }

                // Send data to popup.js
                sendResponse({
                    success: true,
                    data: attendanceData
                });

            } catch (error) {

                console.error("Attendance extraction error:", error);

                sendResponse({
                    success: false,
                    error: error.message
                });

            }

        }

        return true;
    }
);
