// script.js

const courses = {
    "Paradigmas Antropológicos": [],
    "Teoría antropológica I": ["Paradigmas Antropológicos"],
    "Prehistoria General": [],
    "Prehistoria de América": ["Prehistoria General"],
    "Teoría Antropológica II": ["Teoría antropológica I"],
    "Arqueología avanzada I": ["Prehistoria de América"],
    "Arqueología avanzada II": ["Arqueología avanzada I"],
    "Arqueologías simbólicas y materialidades": ["Interpretación en arqueología"],
    "Arqueometria": ["Arqueología cuantitativa"],
    "Arqueología avanzada III": ["Arqueología avanzada II"],
    "Arqueología política y las formas del poder": ["Arqueologías simbólicas y materialidades"],
    "Laboratorio I": ["Arqueometria"],
    "Arqueología de Chile II": ["Arqueología de Chile I"],
    "Arqueología de los Recursos Naturales": ["Arqueología avanzada III"],
    "Arqueología económicas y consumo": ["Arqueología política y las formas del poder"],
    "Laboratorio II": ["Laboratorio I"],
    "Arqueología de Chile III": ["Arqueología de Chile II"],
    "Examen de grado": ["Arqueología de los Recursos Naturales","Arqueología económicas y consumo","Laboratorio II","Arqueología de Chile III"],
    "Arqueología y Empresa": ["Examen de grado"],
    "Arqueología y Ciencia": ["Examen de grado"],
    "Arqueología y Políticas públicas": ["Examen de grado"],
    "Taller de titulación": ["Arqueología y Empresa","Arqueología y Ciencia","Arqueología y Políticas públicas"]
};

function loadState() {
    return JSON.parse(localStorage.getItem('completedCourses') || '[]');
}

function saveState(state) {
    localStorage.setItem('completedCourses', JSON.stringify(state));
}

function createGrid() {
    const container = document.getElementById('grid');
    const completed = loadState();
    const semesters = {};

    document.querySelectorAll('.semester').forEach(sem => {
        semesters[sem.dataset.semester] = sem;
    });

    document.querySelectorAll('.course').forEach(course => {
        const name = course.innerText;
        if (completed.includes(name)) {
            course.classList.add('completed');
        }

        course.addEventListener('click', () => {
            const prereqs = courses[name] || [];
            const state = loadState();

            if (!course.classList.contains('completed')) {
                const canComplete = prereqs.every(req => state.includes(req));
                if (canComplete) {
                    course.classList.add('completed');
                    state.push(name);
                    saveState(state);
                } else {
                    alert('Debes aprobar los requisitos antes de aprobar este ramo: ' + prereqs.join(', '));
                }
            } else {
                course.classList.remove('completed');
                const idx = state.indexOf(name);
                if (idx !== -1) state.splice(idx, 1);
                saveState(state);
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', createGrid);
