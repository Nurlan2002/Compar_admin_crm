document.addEventListener('DOMContentLoaded', function() {
  // Toggle sidebar on mobile
  const toggleBtn = document.getElementById('toggleBtn');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', function () {
      const sidebar = document.getElementById('sidebar');
      if (sidebar) {
        sidebar.classList.toggle('show');
        sidebar.classList.toggle('hidden');
      }
    });
  }

  // Dashboard chart (attendanceChart)
  const dashboardCanvas = document.getElementById('attendanceChart');
  if (dashboardCanvas) {
    const ctx = dashboardCanvas.getContext('2d');
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['1 Avq', '5 Avq', '10 Avq', '15 Avq', '20 Avq', '25 Avq', '31 Avq'],
        datasets: [{
          label: 'Davamiyyət (%)',
          data: [80, 85, 78, 90, 92, 88, 95],
          backgroundColor: 'rgba(13, 110, 253, 0.2)',
          borderColor: 'rgba(13, 110, 253, 1)',
          borderWidth: 2,
          fill: true,
          tension: 0.4
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            max: 100
          }
        }
      }
    });
  }

  // Student_detail chart (attendanceChartStudent)
  const studentCanvas = document.getElementById('attendanceChartStudent');
  if (studentCanvas) {
    const ctxStudent = studentCanvas.getContext('2d');
    new Chart(ctxStudent, {
      type: 'bar',
      data: {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        datasets: [{
          label: 'Attendance (%)',
          data: [100, 90, 80, 95],
          backgroundColor: 'rgba(54, 162, 235, 0.6)'
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            max: 100
          }
        }
      }
    });
  }
});




// Payments
document.addEventListener('DOMContentLoaded', () => {
  const paymentData = [
    { date: '2025-08-01', amount: '$150', status: 'Paid' },
    { date: '2025-07-01', amount: '$150', status: 'Paid' },
    { date: '2025-06-01', amount: '$150', status: 'Unpaid' },
    { date: '2025-05-01', amount: '$150', status: 'Paid' },
  ];

  const tbody = document.getElementById('paymentTableBody');

  paymentData.forEach(payment => {
    const tr = document.createElement('tr');

    tr.innerHTML = `
      <td>${payment.date}</td>
      <td>${payment.amount}</td>
      <td class="${payment.status === 'Paid' ? 'text-success' : 'text-danger'}">${payment.status}</td>
      <td>
        ${payment.status === 'Unpaid' 
          ? '<button class="btn btn-sm btn-primary pay-btn">Pay Now</button>' 
          : '<button class="btn btn-sm btn-secondary" disabled>Paid</button>'}
      </td>
    `;

    tbody.appendChild(tr);
  });

  tbody.addEventListener('click', event => {
    if (event.target.classList.contains('pay-btn')) {
      const row = event.target.closest('tr');
      const date = row.children[0].textContent;

      alert(`Ödəniş tarixi ${date} üçün qəbul edildi!`);
      event.target.textContent = 'Paid';
      event.target.classList.remove('btn-primary', 'pay-btn');
      event.target.classList.add('btn-secondary');
      event.target.disabled = true;

      row.children[2].textContent = 'Paid';
      row.children[2].classList.remove('text-danger');
      row.children[2].classList.add('text-success');
    }
  });
});



// Groups sehifesi

// Qrup nümunə məlumatları
const groups = [
    { id: 1, name: "Frontend Group", course: "Web Development", students: 15, start: "2025-08-01", end: "2025-11-01" },
    { id: 2, name: "Backend Group", course: "Django", students: 12, start: "2025-08-10", end: "2025-11-15" },
    { id: 3, name: "UI/UX Group", course: "Design", students: 10, start: "2025-09-01", end: "2025-12-01" }
];

// Cədvəli doldur
function loadGroups() {
    const tbody = document.getElementById("groupsTableBody");
    tbody.innerHTML = "";
    groups.forEach(group => {
        tbody.innerHTML += `
            <tr>
                <td>${group.id}</td>
                <td>${group.name}</td>
                <td>${group.course}</td>
                <td>${group.students}</td>
                <td>${group.start}</td>
                <td>${group.end}</td>
                <td>
                    <button class="btn btn-warning btn-sm">Edit</button>
                    <button class="btn btn-danger btn-sm">Delete</button>
                </td>
            </tr>
        `;
    });
}

// Qrup əlavə etmə düyməsi
document.getElementById("addGroupBtn").addEventListener("click", function () {
    alert("Yeni qrup əlavə etmə funksiyası buraya gələcək!");
});

loadGroups();




// Cources sehifesi
$(document).ready(function() {
    let courses = [
        { id: 1, name: "Front-end Proqramlaşdırma", teacher: "John Doe", startDate: "2024-05-15" },
        { id: 2, name: "Python Back-end Proqramlaşdırma", teacher: "Jane Smith", startDate: "2024-06-01" },
        { id: 3, name: "Data Science Giriş", teacher: "John Doe", startDate: "2024-07-20" }
    ];

    function renderCourses(courseList) {
        const tableBody = $('#coursesTableBody');
        tableBody.empty();
        if (courseList.length === 0) {
            tableBody.append('<tr><td colspan="5" class="text-center">Heç bir kurs tapılmadı.</td></tr>');
            return;
        }

        courseList.forEach(function(course, index) {
            const row = `
                <tr>
                    <td>${index + 1}</td>
                    <td>${course.name}</td>
                    <td>${course.teacher}</td>
                    <td>${course.startDate}</td>
                    <td>
                        <button class="btn btn-edit me-2" data-id="${course.id}"><i class="fas fa-edit"></i></button>
                        <button class="btn btn-delete" data-id="${course.id}"><i class="fas fa-trash-alt"></i></button>
                    </td>
                </tr>
            `;
            tableBody.append(row);
        });
    }

    renderCourses(courses);

    // Yeni kurs əlavə etmək və ya redaktə etmək üçün
    $('#courseForm').on('submit', function(e) {
        e.preventDefault();
        const courseId = $('#courseId').val();
        const newCourseName = $('#courseName').val();
        const newCourseTeacher = $('#courseTeacher').val();
        const newStartDate = $('#startDate').val();

        if (courseId) {
            // Kursu redaktə etmək
            const courseIndex = courses.findIndex(c => c.id == courseId);
            if (courseIndex !== -1) {
                courses[courseIndex].name = newCourseName;
                courses[courseIndex].teacher = newCourseTeacher;
                courses[courseIndex].startDate = newStartDate;
            }
        } else {
            // Yeni kurs əlavə etmək
            const newId = courses.length ? Math.max(...courses.map(c => c.id)) + 1 : 1;
            const newCourse = {
                id: newId,
                name: newCourseName,
                teacher: newCourseTeacher,
                startDate: newStartDate
            };
            courses.push(newCourse);
        }

        renderCourses(courses);
        $('#courseModal').modal('hide');
        $('#courseForm')[0].reset();
        $('#courseId').val('');
    });

    // Redaktə düyməsi klikləndikdə
    $(document).on('click', '.btn-edit', function() {
        const courseId = $(this).data('id');
        const courseToEdit = courses.find(c => c.id == courseId);

        if (courseToEdit) {
            $('#courseId').val(courseToEdit.id);
            $('#courseName').val(courseToEdit.name);
            $('#courseTeacher').val(courseToEdit.teacher);
            $('#startDate').val(courseToEdit.startDate);
            $('#courseModalLabel').text('Kursu Redaktə Et');
            $('#courseModal').modal('show');
        }
    });

    // Sil düyməsi klikləndikdə
    $(document).on('click', '.btn-delete', function() {
        const courseId = $(this).data('id');
        if (confirm('Bu kursu silməyə əminsiniz?')) {
            courses = courses.filter(c => c.id != courseId);
            renderCourses(courses);
        }
    });

    // Axtarış funksiyası
    $('#searchCourseInput').on('keyup', function() {
        const searchText = $(this).val().toLowerCase();
        const filteredCourses = courses.filter(course => 
            course.name.toLowerCase().includes(searchText) ||
            course.teacher.toLowerCase().includes(searchText)
        );
        renderCourses(filteredCourses);
    });

    // Modal açılarkən başlıq və formun təmizlənməsi
    $('#courseModal').on('show.bs.modal', function() {
        if (!$('#courseId').val()) {
            $('#courseModalLabel').text('Yeni Kurs Əlavə Et');
            $('#courseForm')[0].reset();
        }
    });
});

// Attendance
$(document).ready(function() {
    let studentsData = {
        "Front-end A1": [
            { id: 101, name: "Aliyev Ali" },
            { id: 102, name: "Hasanov Hasan" },
            { id: 103, name: "Zeynalova Zeynep" },
        ],
        "Python B2": [
            { id: 201, name: "Mammadov Mammad" },
            { id: 202, name: "Safarov Samir" },
        ],
        "Data Science C3": [
            { id: 301, name: "Rustamova Aysel" },
            { id: 302, name: "Ahmadov Elmar" },
        ]
    };

    const attendanceForm = $('#attendanceFilters');
    const groupSelect = $('#groupSelect');
    const dateSelect = $('#dateSelect');
    const attendanceTableContainer = $('#attendanceTableContainer');
    const studentsTableBody = $('#studentsTableBody');
    const noDataMessage = $('#noDataMessage');
    const selectedGroupSpan = $('#selectedGroup');
    const selectedDateSpan = $('#selectedDate');
    const saveAttendanceBtn = $('#saveAttendanceBtn');

    attendanceForm.on('submit', function(e) {
        e.preventDefault();
        const selectedGroup = groupSelect.val();
        const selectedDate = dateSelect.val();

        if (selectedGroup && selectedDate) {
            renderStudents(selectedGroup);
            selectedGroupSpan.text(selectedGroup);
            selectedDateSpan.text(selectedDate);
            attendanceTableContainer.removeClass('d-none').addClass('d-block');
            noDataMessage.removeClass('d-block').addClass('d-none');
        } else {
            alert("Zəhmət olmasa, qrup və tarixi seçin.");
            attendanceTableContainer.removeClass('d-block').addClass('d-none');
            noDataMessage.removeClass('d-none').addClass('d-block');
        }
    });

    function renderStudents(groupName) {
        const students = studentsData[groupName] || [];
        studentsTableBody.empty();
        if (students.length === 0) {
            studentsTableBody.append('<tr><td colspan="3" class="text-center">Bu qrupda tələbə yoxdur.</td></tr>');
            return;
        }

        students.forEach((student, index) => {
            const row = `
                <tr>
                    <td>${index + 1}</td>
                    <td>${student.name}</td>
                    <td class="attendance-status">
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="attendance_${student.id}" id="present_${student.id}" value="present" required>
                            <label class="form-check-label" for="present_${student.id}">Gəldi</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="attendance_${student.id}" id="absent_${student.id}" value="absent">
                            <label class="form-check-label" for="absent_${student.id}">Gəlmədi</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="attendance_${student.id}" id="excused_${student.id}" value="excused">
                            <label class="form-check-label" for="excused_${student.id}">İcazəli</label>
                        </div>
                    </td>
                </tr>
            `;
            studentsTableBody.append(row);
        });
    }

    saveAttendanceBtn.on('click', function() {
        const attendanceRecords = [];
        let allStudentsAttended = true;

        studentsTableBody.find('tr').each(function() {
            const studentId = $(this).find('input[type="radio"]').first().attr('name').split('_')[1];
            const attendanceStatus = $(this).find('input[type="radio"]:checked').val();
            
            if (!attendanceStatus) {
                allStudentsAttended = false;
                return false; // Loop-u dayandırır
            }

            attendanceRecords.push({
                studentId: studentId,
                status: attendanceStatus
            });
        });

        if (!allStudentsAttended) {
            alert('Zəhmət olmasa, bütün tələbələrin davamiyyətini qeyd edin.');
            return;
        }

        console.log("Davamiyyət məlumatları yadda saxlandı:", {
            group: groupSelect.val(),
            date: dateSelect.val(),
            records: attendanceRecords
        });
        
        alert('Davamiyyət uğurla yadda saxlandı!');
        // Burada məlumatları Django backend-ə POST etmək üçün AJAX istifadə edilə bilər.
    });
});



// Bace
