document.addEventListener("DOMContentLoaded", function () {

  fetch('/api/students')
    .then(response => {
      if (!response.ok) {
        throw new Error("API returned error " + response.status);
      }
      return response.json();
    })
    .then(data => {

      // ===============================
      // 1. POPULATE TABLE
      // ===============================
      const tableBody = document.querySelector("#studentTable tbody");
      tableBody.innerHTML = "";

      data.forEach(student => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${student.StudentID}</td>
          <td>${student.Name}</td>
          <td>${student.Program}</td>
          <td>${student.AverageScore}</td>
          <td>${student.AverageAttendance}</td>
          <td>${student.RiskLevel}</td>
        `;
        tableBody.appendChild(row);
      });

      // ===============================
      // 2. RISK LEVEL ANALYSIS
      // ===============================
      const riskCounts = {
        "High Risk": 0,
        "Medium Risk": 0,
        "Low Risk": 0
      };

      data.forEach(student => {
        if (riskCounts[student.RiskLevel] !== undefined) {
          riskCounts[student.RiskLevel]++;
        }
      });

      // ===============================
      // 3. BAR CHART (Chart.js)
      // ===============================
      const ctx = document.getElementById("riskChart");

      // Elak chart duplicate jika reload
      if (window.riskChartInstance) {
        window.riskChartInstance.destroy();
      }

      window.riskChartInstance = new Chart(ctx, {
        type: "bar",
        data: {
          labels: Object.keys(riskCounts),
          datasets: [{
            label: "Number of Students by Risk Level",
            data: Object.values(riskCounts),

            // 👇 kawal saiz bar
            barThickness: 30,
            maxBarThickness: 40,

            backgroundColor: [
              "rgba(255, 99, 132, 0.7)",   // High Risk
              "rgba(255, 206, 86, 0.7)",   // Medium Risk
              "rgba(54, 162, 235, 0.7)"    // Low Risk
            ]
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                stepSize: 1
              }
            }
          }
        }
      });

    })
    .catch(err => {
      console.error("Error loading dashboard:", err);
    });

});
