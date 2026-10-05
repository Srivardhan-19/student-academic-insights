(function () {

    console.log("[Student Academic Insights] Extension loaded");

    if (document.getElementById("iiitk-cgpa-extension")) {
        return;
    }

    const gradePoints = {
        "S": 10,
        "A": 9,
        "B": 8,
        "C": 7,
        "D": 6,
        "E": 5,
        "E.": 4,
        "U": 0
    };

    const gradeCounts = {
        "S": 0,
        "A": 0,
        "B": 0,
        "C": 0,
        "D": 0,
        "E": 0,
        "E.": 0,
        "U": 0
    };


    function startCalculator() {

        if (document.getElementById("iiitk-cgpa-extension")) {
            return;
        }

        const courseHistory =
            document.querySelector("#courseHistoryUI");

        if (!courseHistory) {
            console.log(
                "[Student Academic Insights] Course history not found"
            );
            return;
        }

        const semesterElements =
            document.querySelectorAll(
                "#courseHistoryUI ul.subCnt"
            );

        console.log(
            "[Student Academic Insights] Semesters found:",
            semesterElements.length
        );

        if (semesterElements.length === 0) {
            console.log(
                "[Student Academic Insights] No semesters found"
            );
            return;
        }

        calculateCGPA(semesterElements);
    }


    function calculateCGPA(semesterElements) {

        let semesters = [];

        let totalCredits = 0;
        let totalPoints = 0;

        let hasIncompleteHistoricalSemester = false;


        semesterElements.forEach(function (semester) {

            if (!semester) {
                return;
            }

            let semesterCredits = 0;
            let registeredCredits = 0;
            let semesterPoints = 0;

            let courses = [];

            let courseCount = 0;
            let visibleGradeCount = 0;

            let missingRequiredGrade = false;


            const rows =
                semester.querySelectorAll(
                    "li.tab_body_bg"
                );


            rows.forEach(function (row) {

                if (!row) {
                    return;
                }


                const codeElement =
                    row.querySelector(".col1");

                if (!codeElement) {
                    return;
                }


                const code =
                    codeElement.innerText.trim();


                const titleElement =
                    row.querySelector(".col2");

                const creditsElement =
                    row.querySelector(".col3");

                const gradeElement =
                    row.querySelector(".col8");


                const title =
                    titleElement
                        ? titleElement.innerText.trim()
                        : "";


                let credits = 0;


                if (creditsElement) {

                    credits =
                        parseFloat(
                            creditsElement.innerText.trim()
                        );
                }


                if (isNaN(credits)) {
                    credits = 0;
                }


                registeredCredits += credits;


                const grade =
                    gradeElement
                        ? gradeElement.innerText
                            .trim()
                            .toUpperCase()
                        : "";


                courseCount++;


                if (grade !== "") {
                    visibleGradeCount++;
                }


                /*
                 * Grade Distribution
                 *
                 * E and E. are counted separately.
                 * Blank grades are ignored.
                 */

                if (grade !== "") {

                    if (gradeCounts[grade] !== undefined) {

                        gradeCounts[grade]++;
                    }
                }


                if (
                    grade === "" &&
                    credits >= 2
                ) {

                    missingRequiredGrade = true;
                }


                courses.push({
                    code: code,
                    title: title,
                    credits: credits,
                    grade: grade
                });


                if (
                    grade !== "" &&
                    gradePoints[grade] !== undefined &&
                    credits > 0
                ) {

                    const points =
                        credits *
                        gradePoints[grade];

                    semesterCredits += credits;
                    semesterPoints += points;
                }

            });


            const isComplete =
                !missingRequiredGrade;


            let sgpa = null;


            if (
                isComplete &&
                semesterCredits > 0
            ) {

                sgpa =
                    semesterPoints /
                    semesterCredits;
            }


            semesters.push({

                credits: semesterCredits,

                registeredCredits:
                    registeredCredits,

                points: semesterPoints,

                sgpa:
                    sgpa !== null
                        ? sgpa.toFixed(2)
                        : null,

                courses: courses,

                courseCount:
                    courseCount,

                visibleGradeCount:
                    visibleGradeCount,

                complete:
                    isComplete
            });

        });


        semesters.reverse();


        semesters.forEach(function (semester, index) {

            semester.semester =
                index + 1;

        });


        const currentSemester =
            semesters.length > 0
                ? semesters[
                    semesters.length - 1
                ]
                : null;


        if (currentSemester) {

            semesters.forEach(function (semester) {

                if (
                    semester !== currentSemester &&
                    !semester.complete
                ) {

                    hasIncompleteHistoricalSemester =
                        true;
                }

            });

        }


        if (!hasIncompleteHistoricalSemester) {

            semesters.forEach(function (semester) {

                if (semester === currentSemester) {

                    if (semester.complete) {

                        totalCredits +=
                            semester.credits;

                        totalPoints +=
                            semester.points;
                    }

                } else {

                    totalCredits +=
                        semester.credits;

                    totalPoints +=
                        semester.points;
                }

            });

        }


        let cgpa = null;


        if (
            !hasIncompleteHistoricalSemester &&
            totalCredits > 0
        ) {

            cgpa =
                totalPoints /
                totalCredits;
        }


        console.log(
            "[Student Academic Insights] Total Credits:",
            totalCredits
        );


        console.log(
            "[Student Academic Insights] Total Points:",
            totalPoints
        );


        console.log(
            "[Student Academic Insights] CGPA:",
            cgpa !== null
                ? cgpa.toFixed(2)
                : "Not calculated"
        );


        console.log(
            "[Student Academic Insights] Grade Counts:",
            gradeCounts
        );


        createDashboard(

            cgpa !== null
                ? cgpa.toFixed(2)
                : null,

            totalCredits,

            totalPoints,

            semesters,

            hasIncompleteHistoricalSemester,

            currentSemester,

            gradeCounts
        );

    }


    function createDashboard(
        cgpa,
        totalCredits,
        totalPoints,
        semesters,
        hasIncompleteHistoricalSemester,
        currentSemester,
        gradeCounts
    ) {

        console.log(
            "[Student Academic Insights] Creating dashboard"
        );


        if (
            document.getElementById(
                "iiitk-cgpa-extension"
            )
        ) {
            return;
        }


        const dashboard =
            document.createElement("div");


        dashboard.id =
            "iiitk-cgpa-extension";


        let html = "";


        html += `
            <div class="cgpa-header">

                <div>

                    <h2>
                        Student Academic Insights
                    </h2>

                    <p>
                        IIIT Kurnool Academic Summary
                    </p>

                </div>

                <button id="cgpa-close">
                    ×
                </button>

            </div>
        `;


        if (hasIncompleteHistoricalSemester) {

            html += `
                <div class="cgpa-warning">

                    <strong>
                        SGPA/CGPA cannot be calculated
                    </strong>

                    <p>
                        SGPA cannot be calculated for a
                        semester because a grade is blank
                        for a course with 2 or more credits.
                    </p>

                    <p>
                        Overall CGPA cannot be calculated
                        until the required grades are available.
                    </p>

                </div>
            `;

        }


        html += `
            <div class="cgpa-summary">

                <div class="cgpa-card main-card">

                    <span>
                        CGPA
                    </span>

                    <strong>

                        ${
                            cgpa !== null
                                ? cgpa
                                : "—"
                        }

                    </strong>

                </div>

                <div class="cgpa-card">

                    <span>
                        Total Credits
                    </span>

                    <strong>

                        ${
                            hasIncompleteHistoricalSemester
                                ? "—"
                                : totalCredits
                        }

                    </strong>

                </div>

                <div class="cgpa-card">

                    <span>
                        Grade Points
                    </span>

                    <strong>

                        ${
                            hasIncompleteHistoricalSemester
                                ? "—"
                                : totalPoints
                        }

                    </strong>

                </div>

            </div>
        `;


        html += `
            <div class="semester-section">

                <h3>
                    Semester Performance
                </h3>

                <table>

                    <thead>

                        <tr>

                            <th>
                                Semester
                            </th>

                            <th>
                                Credits
                            </th>

                            <th>
                                Grade Points
                            </th>

                            <th>
                                SGPA
                            </th>

                        </tr>

                    </thead>

                    <tbody>
        `;


        semesters.forEach(function (semester) {

            let semesterStatus = "";


            if (
                semester === currentSemester &&
                !semester.complete
            ) {

                semesterStatus = `
                    <span class="semester-status">
                        Ongoing
                    </span>
                `;

            }


            html += `
                <tr>

                    <td>

                        Semester ${semester.semester}

                        ${semesterStatus}

                    </td>

                    <td>

                        ${
                            semester === currentSemester &&
                            !semester.complete
                                ? semester.registeredCredits
                                : semester.credits
                        }

                    </td>

                    <td>

                        ${
                            semester.complete
                                ? semester.points
                                : "—"
                        }

                    </td>

                    <td class="sgpa-value">

                        ${
                            semester.complete &&
                            semester.sgpa !== null

                                ? semester.sgpa

                                : "—"
                        }

                    </td>

                </tr>
            `;

        });


        html += `
                    </tbody>

                </table>

            </div>
        `;


        /*
         * Grade Distribution
         */

        html += `
            <div class="grade-distribution">

                <h3>
                    Grade Distribution
                </h3>

                <div class="grade-list">
        `;


        const grades = [
            "S",
            "A",
            "B",
            "C",
            "D",
            "E",
            "E.",
            "U"
        ];


        let maximumGradeCount = 0;


        grades.forEach(function (grade) {

            if (
                gradeCounts[grade] >
                maximumGradeCount
            ) {

                maximumGradeCount =
                    gradeCounts[grade];
            }

        });


        grades.forEach(function (grade) {

            const count =
                gradeCounts[grade];


            let barWidth = 0;


            if (maximumGradeCount > 0) {

                barWidth =
                    (count /
                    maximumGradeCount) *
                    100;

            }


            html += `
                <div class="grade-row">

                    <div class="grade-label">
                        ${grade}
                    </div>

                    <div class="grade-bar-container">

                        <div
                            class="grade-bar"
                            style="width: ${barWidth}%"
                        ></div>

                    </div>

                    <div class="grade-count">
                        ${count}
                    </div>

                </div>
            `;

        });


        html += `
                </div>

            </div>
        `;


        html += `
            <div class="cgpa-footer">

                Calculated from course credits
                and visible AIMS grades.

            </div>

            <div class="cgpa-note">

                Note: CGPA may vary slightly because
                1-credit courses with unavailable grades
                are not included in the calculation.

            </div>
        `;


        dashboard.innerHTML =
            html;


        document.body.appendChild(
            dashboard
        );


        const closeButton =
            document.getElementById(
                "cgpa-close"
            );


        if (closeButton) {

            closeButton.addEventListener(
                "click",
                function () {

                    dashboard.remove();

                }
            );

        }


        console.log(
            "[Student Academic Insights] Dashboard added"
        );

    }


    let attempts = 0;

    const maxAttempts = 30;


    const waitForData =
        setInterval(function () {

            attempts++;


            const semesters =
                document.querySelectorAll(
                    "#courseHistoryUI ul.subCnt"
                );


            console.log(
                "[Student Academic Insights] " +
                "Checking semesters:",
                semesters.length
            );


            if (semesters.length > 0) {

                clearInterval(
                    waitForData
                );

                startCalculator();

            }


            if (
                attempts >= maxAttempts
            ) {

                clearInterval(
                    waitForData
                );


                console.log(
                    "[Student Academic Insights] " +
                    "Timed out waiting for course data"
                );

            }

        }, 500);

})();

