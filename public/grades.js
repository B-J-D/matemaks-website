document.addEventListener("DOMContentLoaded", () => {
  const gradeInput = document.getElementById("grade-input");
  const addCategoryA = document.getElementById("add-category-a");
  const addCategoryB = document.getElementById("add-category-b");
  const addCategoryC = document.getElementById("add-category-c");
  const gradesA = document.getElementById("grades-a");
  const gradesB = document.getElementById("grades-b");
  const gradesC = document.getElementById("grades-c");
  const resetGrades = document.getElementById("reset-grades");
  const averageDisplay = document.getElementById("average-display").querySelector("h2");

  let grades = {
    A: [],
    B: [],
    C: []
  };

  // Load grades from browser storage
  if (localStorage.getItem("grades")) {
    grades = JSON.parse(localStorage.getItem("grades"));
    updateGradesDisplay();
    updateAverage();
  }

  function updateAverage() {
    function sumArray(arr) {
      return arr.reduce((acc, val) => acc + val, 0);
    }

    const sumA = sumArray(grades.A);
    const sumB = sumArray(grades.B);
    const sumC = sumArray(grades.C);

    const lengthA = grades.A.length || 1;
    const lengthB = grades.B.length || 1;
    const lengthC = grades.C.length || 1;

    const average = ((sumA/lengthA)*0.6)+((sumB/lengthB)*0.25)+((sumC/lengthC)*0.15);

    averageDisplay.textContent = average.toFixed(2);

    averageDisplay.classList.remove("white", "red", "green");
    if (average === 0) {
      averageDisplay.classList.add("white");
    } else if (average < 4.00) {
      averageDisplay.classList.add("red");
    } else {
      averageDisplay.classList.add("green");
    }
  }

  function addGrade(category) {
    const gradeValue = parseFloat(gradeInput.value) || 0;
    if (isNaN(gradeValue) || gradeValue < 0 || gradeValue > 12) {
      alert("Please enter a valid grade between 0 and 12.");
      return;
    }

    grades[category].push(gradeValue);

    const gradeElement = document.createElement("div");
    gradeElement.classList.add("grade");
    gradeElement.textContent = gradeValue.toFixed(2);

    if (category === "A") {
      gradesA.appendChild(gradeElement);
    } else if (category === "B") {
      gradesB.appendChild(gradeElement);
    } else {
      gradesC.appendChild(gradeElement);
    }

    updateAverage();
    gradeInput.value = ""; // Reset the text box after adding the grade

    // Save grades to browser storage
    localStorage.setItem("grades", JSON.stringify(grades));
  }

  function resetAllGrades() {
    grades = {
      A: [],
      B: [],
      C: []
    };

    gradesA.innerHTML = "";
    gradesB.innerHTML = "";
    gradesC.innerHTML = "";

    updateAverage();

    // Clear grades from browser storage
    localStorage.removeItem("grades");
  }

  function deleteGrade(event) {
    const gradeElement = event.target;
    const category = gradeElement.parentElement.id.split("-")[1].toUpperCase();
    const gradeValue = parseFloat(gradeElement.textContent);

    const gradeIndex = grades[category].indexOf(gradeValue);
    if (gradeIndex > -1) {
      grades[category].splice(gradeIndex, 1);
    }

    gradeElement.remove();
    updateAverage();

    // Update grades in browser storage
    localStorage.setItem("grades", JSON.stringify(grades));
  }

  function updateGradesDisplay() {
    gradesA.innerHTML = "";
    gradesB.innerHTML = "";
    gradesC.innerHTML = "";

    grades.A.forEach((gradeValue) => {
      const gradeElement = document.createElement("div");
      gradeElement.classList.add("grade");
      gradeElement.textContent = gradeValue.toFixed(2);
      gradesA.appendChild(gradeElement);
    });

    grades.B.forEach((gradeValue) => {
      const gradeElement = document.createElement("div");
      gradeElement.classList.add("grade");
      gradeElement.textContent = gradeValue.toFixed(2);
      gradesB.appendChild(gradeElement);
    });

    grades.C.forEach((gradeValue) => {
      const gradeElement = document.createElement("div");
      gradeElement.classList.add("grade");
      gradeElement.textContent = gradeValue.toFixed(2);
      gradesC.appendChild(gradeElement);
    });
  }

  // Add event listeners
  addCategoryA.addEventListener("click", () => addGrade("A"));
  addCategoryB.addEventListener("click", () => addGrade("B"));
  addCategoryC.addEventListener("click", () => addGrade("C"));
  resetGrades.addEventListener("click", resetAllGrades);
  gradesA.addEventListener("click", deleteGrade);
  gradesB.addEventListener("click", deleteGrade);
  gradesC.addEventListener("click", deleteGrade);
});
