# Student Academic Insights

A Chrome extension for the IIIT Kurnool AIMS portal that automatically calculates and displays academic performance insights from the student's course history.

## Features

- Automatically reads course history from the IIIT Kurnool AIMS portal
- Calculates semester-wise SGPA
- Calculates overall CGPA
- Displays total completed credits
- Displays total grade points
- Shows semester-wise academic performance
- Detects the current ongoing semester
- Displays registered credits for an ongoing semester
- Handles blank grades
- Supports the following grades:
  - S
  - A
  - B
  - C
  - D
  - E
  - E.
  - U
- Displays grade distribution
- Counts E and E. separately
- Excludes unavailable grades from calculations
- Provides a clean academic dashboard directly on the AIMS page

## Supported Portal

IIIT Kurnool AIMS

https://aims.iiitk.ac.in/aimskurnool/

## Installation

### Using Chrome Developer Mode

1. Download or clone this repository.

2. Open Google Chrome.

3. Go to:

   chrome://extensions/

4. Enable Developer mode.

5. Click Load unpacked.

6. Select the project folder:

   CGPA_Calculator-Extension

7. Open the IIIT Kurnool AIMS Course History page.

8. The Student Academic Insights dashboard will appear automatically.

## Project Structure

CGPA_Calculator-Extension/
│
├── manifest.json
├── content.js
├── style.css
├── README.md
│
└── icons/
    ├── icon16.png
    ├── icon32.png
    ├── icon48.png
    └── icon128.png

## Grade Calculation

The extension uses the following grade-point mapping:

| Grade | Grade Point |
|-------|-------------|
| S     | 10          |
| A     | 9           |
| B     | 8           |
| C     | 7           |
| D     | 6           |
| E     | 5           |
| E.    | 4           |
| U     | 0           |

### Grade Points

For each course:

Grade Points = Credits × Grade Point

### SGPA

SGPA = Total Grade Points / Total Credits

### CGPA

CGPA = Total Grade Points / Total Credits

The CGPA is calculated using completed semesters only.

## Ongoing Semester

The extension identifies the latest semester as the current semester when it contains unavailable grades.

For an ongoing semester:

- Registered credits are displayed.
- Blank grades are not included in SGPA or CGPA.
- Grade points are displayed as —.
- SGPA is displayed as —.
- The semester is marked as Ongoing.

The ongoing semester does not affect the completed-semester CGPA calculation.

## Blank Grades

Blank grades are handled based on the course credit value:

- Blank grade with 0 credits → ignored
- Blank grade with 1 credit → ignored
- Blank grade with 2 or more credits → semester is considered incomplete

If a historical semester has a missing grade for a course with 2 or more credits, SGPA and overall CGPA cannot be calculated until the required grade becomes available.

## Grade Distribution

The dashboard displays the number of visible grades for:

S
A
B
C
D
E
E.
U

E and E. are counted separately.

Blank grades are not included in the grade distribution.

## Academic Dashboard

The dashboard provides:

- Overall CGPA
- Total completed credits
- Total grade points
- Semester-wise credits
- Semester-wise grade points
- Semester-wise SGPA
- Ongoing semester status
- Grade distribution

## Privacy

Student academic information is processed locally in the browser.

The extension does not use a backend server or external database.

The extension operates on the IIIT Kurnool AIMS portal and does not require access to unrelated websites.

## Technology

- JavaScript
- HTML
- CSS
- Chrome Extension Manifest V3

## Version

1.0.0

## Author

Srivardhan

## License

This project is intended for educational and academic use.

## Installation

### Option 1: Download from GitHub

1. Open the GitHub repository:

   https://github.com/Srivardhan-19/student-academic-insights

2. Click the green **Code** button.

3. Select **Download ZIP**.

4. Extract the downloaded ZIP file.

5. Open Google Chrome and go to:

   chrome://extensions/

6. Enable **Developer mode**.

7. Click **Load unpacked**.

8. Select the extracted project folder containing:

   manifest.json

9. Open the IIIT Kurnool AIMS Course History page.

10. The **Student Academic Insights** dashboard will appear automatically.

### Option 2: Clone using Git

```bash
git clone https://github.com/Srivardhan-19/student-academic-insights.git