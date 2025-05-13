let students = [];

document
  .getElementById("formSubmitStudent")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const inputCode = document.getElementById("studentCode");
    const inputName = document.getElementById("studentName");
    const inputPoint = document.getElementById("point");

    const studentCode = inputCode.value.trim();
    const studentName = inputName.value.trim();
    const studentPoint = parseFloat(inputPoint.value);

    const codeError = document.getElementById("codeError");
    const pointError = document.getElementById("pointError");
    const nameError = document.getElementById("nameError");

    inputCode.classList.remove("border-red-500");
    codeError.classList.add("hidden");

    inputPoint.classList.remove("border-red-500");
    pointError.classList.add("hidden");

    inputName.classList.remove("border-red-500");
    nameError.classList.add("hidden");

    const specialChar = /[0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

    if (!studentCode || !studentName || isNaN(studentPoint)) {
      alert("Vui lòng nhập đầy đủ và đúng thông tin.");
      return;
    }

    let isDuplicate = false;
    for (let i = 0; i < students.length; i++) {
      if (students[i].code === studentCode) {
        isDuplicate = true;
        break;
      }
    }

    if (isDuplicate) {
      inputCode.classList.add("border-red-500");
      codeError.classList.remove("hidden");
      return;
    }

    if (studentPoint > 10 || studentPoint < 0) {
      inputPoint.classList.add("border-red-500");
      pointError.classList.remove("hidden");
      return;
    }

    if (specialChar.test(studentName)) {
      inputName.classList.add("border-red-500");
      nameError.classList.remove("hidden");
      return;
    }

    const newStudent = {
      code: studentCode,
      name: studentName,
      point: studentPoint,
    };

    students.push(newStudent);
    this.reset();

    renderTable();
    openModal();
  });

async function renderTable() {
  const tbody = document.getElementById("studentTableBody");
  tbody.innerHTML = "";
  for (let i = 0; i < students.length; i++) {
    const stu = students[i];    
    await tbody.appendChild(createStudentRow(stu));
  }
}

function openModal() {
  const modal = document.getElementById("studentModal");
  modal.classList.remove("hidden");
  modal.classList.add("flex");
}

function closeModal() {
  const modal = document.getElementById("studentModal");
  modal.classList.remove("flex");
  modal.classList.add("hidden");
}

async function loadStudentModal() {
  const response = await fetch("studentModal.html");
  const html = await response.text();
  document.getElementById("modalContainer").innerHTML = html;
}

function sortStudentByPoint(desc) {
  if (!desc) {
    for (let i = 0; i < students.length - 1; i++) {
      for (let j = 0; j < students.length - i - 1; j++) {
        if (students[j].point > students[j + 1].point) {
          let temp = students[j];
          students[j] = students[j + 1];
          students[j + 1] = temp;
        }
      }
    }
  } else {
    for (let i = 0; i < students.length - 1; i++) {
      for (let j = 0; j < students.length - i - 1; j++) {
        if (students[j].point < students[j + 1].point) {
          let temp = students[j];
          students[j] = students[j + 1];
          students[j + 1] = temp;
        }
      }
    }
  }
}

function highestPoint() {
  let higestStudentPoint = [];
  if (students.length === 0) return higestStudentPoint;

  let max = students[0].point;
  for (let i = 1; i < students.length; i++) {
    if (students[i].point > max) {
      max = students[i].point;
    }
  }

  for (let i = 0; i < students.length; i++) {
    if (students[i].point === max) {
      higestStudentPoint.push(students[i]);
    }
  }

  return higestStudentPoint;
}

function averagePoint() {
  let sum = 0;
  for (let i = 0; i < students.length; i++) {
    sum += students[i].point;
  }
  return sum / students.length;
}

async function loadHighestPoint() {
  let highestArray = highestPoint();
  const tbody = document.getElementById("studentTableBody");
  tbody.innerHTML = "";

  for (let i = 0; i < highestArray.length; i++) {
    const stu = highestArray[i];
    await tbody.appendChild(createStudentRow(stu));
  }
}

async function loadSortStudentByPoint(desc) {
  sortStudentByPoint(desc);

  const tbody = document.getElementById("studentTableBody");
  tbody.innerHTML = "";
  for (let i = 0; i < students.length; i++) {
    const stu = students[i];    
    await tbody.appendChild(createStudentRow(stu));
  }
}

async function loadAveragePoint() {
  const avg = averagePoint();
  alert(`Điểm trung bình: ${avg}`);
}

function createStudentRow(stu) {
  const row = document.createElement("tr");

  let bgColor = "";
  if (stu.point >= 8) {
    bgColor = "bg-green-100";
  } else if (stu.point >= 6.5) {
    bgColor = "bg-yellow-100";
  } else {
    bgColor = "bg-red-100";
  }

  row.className = bgColor;
  row.innerHTML = `
    <td class="border px-3 py-2">${stu.code}</td>
    <td class="border px-3 py-2">${stu.name}</td>
    <td class="border px-3 py-2">${stu.point}</td>
  `;
  return row;
}
