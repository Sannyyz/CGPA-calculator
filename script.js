document.addEventListener("DOMContentLoaded", function () {

    const preloader = document.getElementById('preloader');

    preloader.classList.add('hidden');

    if (!localStorage.getItem('neverShowModal')) {

        $('#infoModal').modal('show');

    }

});

document.getElementById('neverShowAgain').addEventListener('change', function () {

    if (this.checked) {

        localStorage.setItem('neverShowModal', 'true');

    } else {

        localStorage.removeItem('neverShowModal');

    }

});

function toggleTheme() {

    document.body.classList.toggle('dark-mode');

    const themeIcon = document.getElementById('themeIcon');

    themeIcon.classList.toggle('fa-moon');

    themeIcon.classList.toggle('fa-sun');

}

function generateCourseFields() {

    const numCourses = document.getElementById('numCourses').value;

    const coursesContainer = document.getElementById('courses');

    coursesContainer.innerHTML = ''; // Clear previous fields

    for (let i = 0; i < numCourses; i++) {

        const courseForm = document.createElement('div');

        courseForm.className = 'form-group course-form';

        courseForm.innerHTML = `

            <label for="courseCode${i}">Course Code</label>

            <input type="text" class="form-control" id="courseCode${i}" required>

            <label for="courseUnit${i}">Course Unit</label>

            <input type="number" class="form-control" id="courseUnit${i}" min="1" required>

            <label for="courseMark${i}">Course Mark</label>

            <input type="number" class="form-control" id="courseMark${i}" min="0" max="100" required>

        `;

        coursesContainer.appendChild(courseForm);

    }

    const calculateButton = document.createElement('button');

    calculateButton.type = 'button';

    calculateButton.className = 'btn btn-primary btn-block glow-button';

    calculateButton.innerText = 'Calculate CGPA';

    calculateButton.onclick = calculateCGPA;

    coursesContainer.appendChild(calculateButton);

}

function calculateCGPA() {

    const numCourses = document.getElementById('numCourses').value;

    let totalUnits = 0;

    let totalPoints = 0;

    for (let i = 0; i < numCourses; i++) {

        const unit = parseFloat(document.getElementById(`courseUnit${i}`).value);

        const mark = parseFloat(document.getElementById(`courseMark${i}`).value);

        totalUnits += unit;

        totalPoints += unit * (mark / 100 * 5);

    }

    const cgpa = (totalPoints / totalUnits).toFixed(2);

    document.getElementById('cgpa').innerText = cgpa;

    document.getElementById('result').classList.remove('d-none');

}

function saveCGPA() {

    const cgpa = document.getElementById('cgpa').innerText;

    const date = new Date().toLocaleDateString();

    let savedCGPAs = JSON.parse(localStorage.getItem('savedCGPAs')) || [];

    savedCGPAs.push({ cgpa, date });

    localStorage.setItem('savedCGPAs', JSON.stringify(savedCGPAs));

    alert('CGPA saved successfully!');

}

document.addEventListener("DOMContentLoaded", function () {

    const savedCGPAs = JSON.parse(localStorage.getItem('savedCGPAs')) || [];

    const savedCGPAList = document.getElementById('savedCGPAList');

    savedCGPAList.innerHTML = '';

    savedCGPAs.forEach((item, index) => {

        const listItem = document.createElement('li');

        listItem.className = 'list-group-item';

        listItem.innerHTML = `CGPA: ${item.cgpa} - Date: ${item.date}`;

        savedCGPAList.appendChild(listItem);

    });

});