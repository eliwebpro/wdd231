document.getElementById("currentyear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent += document.lastModified;

document.addEventListener("DOMContentLoaded", () => {
    // hamburger menu
    const menuBtn = document.getElementById("menuBtn");
    const navMenu = document.getElementById("navMenu");

    menuBtn.addEventListener("click", () => {
        navMenu.classList.toggle("show");
        menuBtn.classList.toggle("open");
});

document.addEventListener("DOMContentLoaded", () => {
    // Get the current page URL (removing extra parameters)
    const currentPage = window.location.pathname.split("/").pop();

    // Select all navigation links
    const navLinks = document.querySelectorAll("nav ul li a");

    navLinks.forEach(link => {
        const linkPage = link.getAttribute("href").split("/").pop();

        // Compare link with current page and set active class
        if (linkPage === currentPage || (currentPage === "" && linkPage === "index.html")) {
            link.classList.add("active");
        } else {
            link.classList.remove("active"); // Ensure inactive pages do not stay highlighted
        }
    });

    // Hamburger Menu Toggle
    const menuBtn = document.getElementById("menuBtn");
    const navMenu = document.getElementById("navMenu");

    menuBtn.addEventListener("click", () => {
        navMenu.classList.toggle("show");
        menuBtn.classList.toggle("open");
    });
});




    // course list filtering
    const courses = [
        { code: "CSE 110", name: "Intro to Programming", completed: true },
        { code: "WDD 130", name: "Web Fundamentals", completed: true },
        { code: "CSE 111", name: "Programming Principles", completed: true },
        { code: "CSE 210", name: "Programming with Classes", completed: true },
        { code: "WDD 131", name: "Web Development I", completed: true },
        { code: "WDD 231", name: "Frontend Development", completed: false }
    ];

    const courseList = document.getElementById("courseList");

    function displayCourses(filter = "all") {
        courseList.innerHTML = "";
        let filteredCourses = courses;

        if (filter === "CSE") {
            filteredCourses = courses.filter(c => c.code.startsWith("CSE"));
        } else if (filter === "WDD") {
            filteredCourses = courses.filter(c => c.code.startsWith("WDD"));
        }

        filteredCourses.forEach(course => {
            const courseDiv = document.createElement("div");
            courseDiv.className = course.completed ? "course-item completed" : "course-item not-completed";
            courseDiv.textContent = `${course.code}`;
            courseList.appendChild(courseDiv);
        });
        const totalCredits = filteredCourses.length * 3; // Assuming each course is 3 credits
        document.getElementById("creditsTotal").textContent = `Total Credits: ${totalCredits}`;
    }

    // add click for filters
    document.getElementById("showAll").addEventListener("click", () => displayCourses("all"));
    document.getElementById("showCSE").addEventListener("click", () => displayCourses("CSE"));
    document.getElementById("showWDD").addEventListener("click", () => displayCourses("WDD"));

    displayCourses();
});
