# Bunk Classes – Attendance Tracker

A simple Chrome extension to track your college attendance, calculate bunk allowances, and manage your attendance percentage easily.

## Features

- **Attendance Tracking:** View your current attendance details.
- **Bunk Calculator:** Calculate how many classes you can bunk without falling below your required attendance percentage.
- **Attendance Percentage:** Quickly check your attendance percentage.
- **Quick Access:** Access your attendance details directly through the Chrome extension popup.
- **Automatic Data Retrieval:** Fetch attendance information from your college portal.
- **Attendance Planning:** Make informed decisions about attending or bunking classes.

## Tech Stack

- JavaScript
- HTML5
- CSS3
- Chrome Extension APIs
- Chrome Manifest V3

## Installation Guide

Follow these steps to install the extension in Google Chrome.

### Step 1: Download the Repository

1. Open the [Bunk Classes GitHub Repository](https://github.com/siddu2999/bunk.classes).
2. Click the green **Code** button.
3. Select **Download ZIP**.

### Step 2: Extract the ZIP File

1. Open your Downloads folder.
2. Locate the downloaded ZIP file.
3. Extract the ZIP file.
4. You will get a folder containing the extension files.

### Step 3: Open Chrome Extensions

1. Open Google Chrome.
2. Enter the following URL in the address bar:

   ```text
   chrome://extensions/
   ```

3. Press Enter.

### Step 4: Enable Developer Mode

1. Find the **Developer mode** toggle in the top-right corner.
2. Turn it ON.

### Step 5: Load the Extension

1. Click the **Load unpacked** button.
2. Select the extracted `bunk.classes-main` folder.
3. Make sure you select the folder containing the `manifest.json` file.
4. Click **Select Folder**.

Your extension should now appear in Chrome!

### Step 6: Pin the Extension

1. Click the Extensions icon (puzzle-piece icon) in Chrome.
2. Find **Bunk Classes**.
3. Click the pin icon to keep it visible in your toolbar.

That's it! You have successfully installed Bunk Classes.

## How to Use

1. Open Vasavi Collage attendance portal (presently designed for my collage).
2. Log in to your account.
3. Open the Bunk Classes extension from the Chrome toolbar.
4. View your attendance information.
5. Use the bunk calculator to understand how many classes you can miss while maintaining your target attendance(75%).

## Project Structure

```text
bunk.classes/
│
├── manifest.json          # Chrome extension configuration
│
├── popup.html             # Extension popup interface
├── popup.css              # Popup styling
├── popup.js               # Popup functionality and UI logic
│
├── content.js             # Interacts with the college attendance portal
│
├── icons/                 # Extension icons
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
│
└── README.md              # Project documentation
```

*Note: The structure above is an illustrative overview. Update the filenames and folders to match the actual repository if they differ.*

## Updating the Extension

Whenever a new version is available:

1. Download the latest ZIP from the GitHub repository.
2. Extract the ZIP file.
3. Open `chrome://extensions/`.
4. Remove the older Bunk Classes installation.
5. Click **Load unpacked**.
6. Select the newly extracted project folder.

## Privacy

- The extension is intended to retrieve attendance information from your college portal.
- Your college login credentials should be handled securely.
- Do not share your login credentials with anyone.

## Future Improvements

- Improved attendance analytics.
- Support for multiple college portals.
- Better attendance prediction.
- Enhanced user interface.

## Contributing

Contributions are welcome!

1. Fork this repository.
2. Create a new branch.
3. Make your changes.
4. Submit a Pull Request.

## Support

If you find a bug or have a feature request, feel free to open an issue in this repository.

---

**If you find this project useful, consider giving it a ⭐ on GitHub!**
