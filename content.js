(function() {

    console.log("[IIITK CGPA] Extension loaded");

    // Prevent duplicate dashboard
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
        "U":0
    };


    function startCalculator() {

        // Prevent duplicate execution
        if (document.getElementById("iiitk-cgpa-extension")) {
            return;
        }

        const courseHistory =
            document.querySelector("#courseHistoryUI");

        if (!courseHistory) {
            console.log("[IIITK CGPA] Course history not found");
            return;
        }

        const semesterElements =
            document.querySelectorAll(
                "#courseHistoryUI ul.subCnt"
            );

        console.log(
            "[IIITK CGPA] Semesters found:",
            semesterElements.length
        );

        // AIMS has not finished loading the semesters yet
        if (semesterElements.length === 0) {
            return;
        }

        calculateCGPA(semesterElements);
    }


    function calculateCGPA(semesterElements) {

        let semesters = [];

        let totalCredits = 0;
        let totalPoints = 0;


        semesterElements.forEach(function(semester) {

            let semesterCredits = 0;
            let semesterPoints = 0;

            let courses = [];


            semester
                .querySelectorAll("li.tab_body_bg")
                .forEach(function(row) {

                    const codeElement =
                        row.querySelector(".col1");

                    // Skip semester header
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


                    const credits =
                        creditsElement
                            ? parseFloat(
                                creditsElement.innerText.trim()
                              )
                            : 0;


                    const grade =
                        gradeElement
                            ? gradeElement.innerText
                                .trim()
                                .toUpperCase()
                            : "";


                    courses.push({
                        code: code,
                        title: title,
                        credits: credits,
                        grade: grade
                    });


                    if (
                        grade &&
                        gradePoints[grade] !== undefined &&
                        credits > 0
                    ) {

                        const points =
                            credits * gradePoints[grade];


                        semesterCredits += credits;
                        semesterPoints += points;


                        totalCredits += credits;
                        totalPoints += points;
                    }

                });


            let sgpa = 0;


            if (semesterCredits > 0) {

                sgpa =
                    semesterPoints /
                    semesterCredits;
            }


            semesters.push({

                credits: semesterCredits,

                points: semesterPoints,

                sgpa: sgpa.toFixed(2),

                courses: courses

            });

        });


        // AIMS displays latest semester first
        semesters.reverse();


        semesters.forEach(function(semester, index) {

            semester.semester = index + 1;

        });


        let cgpa = 0;


        if (totalCredits > 0) {

            cgpa =
                totalPoints /
                totalCredits;
        }


        console.log(
            "[IIITK CGPA] Total Credits:",
            totalCredits
        );

        console.log(
            "[IIITK CGPA] Total Points:",
            totalPoints
        );

        console.log(
            "[IIITK CGPA] CGPA:",
            cgpa.toFixed(2)
        );


        createDashboard(
            cgpa.toFixed(2),
            totalCredits,
            totalPoints,
            semesters
        );

    }


    function createDashboard(
        cgpa,
        totalCredits,
        totalPoints,
        semesters
    ) {

        console.log(
            "[IIITK CGPA] Creating dashboard"
        );


        const dashboard =
            document.createElement("div");


        dashboard.id =
            "iiitk-cgpa-extension";


        let html = "";


        html += `
            <div class="cgpa-header">

                <div>

                    <h2>CGPA Calculator</h2>

                    <p>
                        IIIT Kurnool Academic Summary
                    </p>

                </div>

                <button id="cgpa-close">
                    ×
                </button>

            </div>
        `;


        html += `
            <div class="cgpa-summary">

                <div class="cgpa-card main-card">

                    <span>CGPA</span>

                    <strong>${cgpa}</strong>

                </div>


                <div class="cgpa-card">

                    <span>Total Credits</span>

                    <strong>${totalCredits}</strong>

                </div>


                <div class="cgpa-card">

                    <span>Grade Points</span>

                    <strong>${totalPoints}</strong>

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

                            <th>Semester</th>

                            <th>Credits</th>

                            <th>Grade Points</th>

                            <th>SGPA</th>

                        </tr>

                    </thead>

                    <tbody>
        `;


        semesters.forEach(function(semester) {

            html += `
                <tr>

                    <td>
                        Semester ${semester.semester}
                    </td>

                    <td>
                        ${semester.credits}
                    </td>

                    <td>
                        ${semester.points}
                    </td>

                    <td class="sgpa-value">
                        ${semester.sgpa}
                    </td>

                </tr>
            `;

        });


        html += `
                    </tbody>

                </table>

            </div>
        `;


        html += `
            <div class="cgpa-footer">

                Calculated from course credits and grades

            </div>
        `;


        dashboard.innerHTML = html;


        document.body.appendChild(dashboard);


        document
            .getElementById("cgpa-close")
            .addEventListener(
                "click",
                function() {

                    dashboard.remove();

                }
            );


        console.log(
            "[IIITK CGPA] Dashboard added"
        );

    }


    /*
     * AIMS loads course history dynamically.
     *
     * Wait until the semester elements
     * actually appear.
     */

    let attempts = 0;

    const maxAttempts = 30;


    const waitForData =
        setInterval(function() {

            attempts++;


            const semesters =
                document.querySelectorAll(
                    "#courseHistoryUI ul.subCnt"
                );


            console.log(
                "[IIITK CGPA] Checking semesters:",
                semesters.length
            );


            if (semesters.length > 0) {

                clearInterval(waitForData);

                startCalculator();

            }


            if (attempts >= maxAttempts) {

                clearInterval(waitForData);

                console.log(
                    "[IIITK CGPA] Timed out waiting for course data"
                );

            }

        }, 500);


})();