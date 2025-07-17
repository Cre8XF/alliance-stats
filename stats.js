const sheetId = "1DmN26i4QWoHfNg5MiIJIq_tbVEjDfA4l_-a85cAVwSE";
let currentSort = "none"; // Ny variabel for sortering

document.getElementById("sortSelect").addEventListener("change", (e) => {
  currentSort = e.target.value;
  loadMonthData(document.getElementById("monthSelect").value);
});

document.getElementById("monthSelect").addEventListener("change", (e) => {
  loadMonthData(e.target.value);
});

function loadMonthData(month) {
  const encodedMonth = encodeURIComponent(month);
  const url = `https://opensheet.elk.sh/${sheetId}/${encodedMonth}`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      const grid = document.getElementById("player-grid");
      grid.innerHTML = "";

      if (currentSort !== "none") {
        data.sort((a, b) => {
          const valA = parseInt((a[currentSort] || "0").replace(/,/g, ""));
          const valB = parseInt((b[currentSort] || "0").replace(/,/g, ""));
          return valB - valA;
        });
      }

      data.forEach(player => {
        const card = document.createElement("div");
        const currentTheme = document.body.className || "theme-green";
        card.className = `flip-card ${currentTheme}`;

        card.innerHTML = `
          <div class="flip-card-inner">
            <div class="flip-card-front">
              <h3>${player.name || "Unknown"}</h3>
              <p><strong>IGG ID:</strong> ${player.iggid || "N/A"}</p>
              <p><strong>Might:</strong> ${player.might || "N/A"}</p>
              <p><strong>Kill Points:</strong> ${player.kill_points || "N/A"}</p>
            </div>
            <div class="flip-card-back">
              <details class="section">
                <summary>IR Event</summary>
                <p><strong>Might After IR:</strong> ${player.might_after_ir_event || "N/A"}</p>
                <p><strong>Kill Points After IR:</strong> ${player.kill_points_after_ir || "N/A"}</p>
                <p><strong>T4:</strong> ${player.t4_1 || "0"}</p>
                <p><strong>T5:</strong> ${player.t5_1 || "0"}</p>
                <p><strong>T6:</strong> ${player.t6_1 || "0"}</p>
                <p><strong>Kills (IR):</strong> ${player.no_of_kills_on_this_ir || "0"}</p>
                <p><strong>IR Points:</strong> ${player.ir_points || "0"}</p>
                <p><strong>Merit:</strong> ${player.merit_reward_received || "N/A"}</p>
              </details>

              <details class="section">
                <summary>AR Event</summary>
                <p><strong>AR Registered:</strong> ${player.ar_registration_2nd_event || "N/A"}</p>
                <p><strong>Might After AR:</strong> ${player.might_after_ar || "N/A"}</p>
                <p><strong>Kill Points After AR:</strong> ${player.kill_points_after_ar || "N/A"}</p>
                <p><strong>T4:</strong> ${player.t4_2 || "0"}</p>
                <p><strong>T5:</strong> ${player.t5_2 || "0"}</p>
                <p><strong>T6:</strong> ${player.t6_2 || "0"}</p>
                <p><strong>Kills (AR):</strong> ${player.no_of_kills_on_this_ar || "0"}</p>
                <p><strong>Faction Points:</strong> ${player.ar_faction_points || "0"}</p>
                <p><strong>Merit:</strong> ${player["merit_reward_received.1"] || "N/A"}</p>
              </details>

              <details class="section">
                <summary>GW Event</summary>
                <p><strong>GW Registered:</strong> ${player.gw_registration_1st_event || "N/A"}</p>
                <p><strong>Might After GW:</strong> ${player.might_after_tc__gw || "N/A"}</p>
                <p><strong>Kill Points After GW:</strong> ${player.kill_points_after_gw || "N/A"}</p>
                <p><strong>T4:</strong> ${player.T4_3 || "0"}</p>
                <p><strong>T5:</strong> ${player.T5_3 || "0"}</p>
                <p><strong>T6:</strong> ${player.T6_3 || "0"}</p>
                <p><strong>Kills (GW):</strong> ${player.no_of_kills_on_this_gw || "0"}</p>
                <p><strong>GW Points:</strong> ${player.gw_points || "0"}</p>
                <p><strong>Merit:</strong> ${player["merit_reward_received.2"] || "N/A"}</p>
              </details>

              <details class="section">
                <summary>District & AI</summary>
                <p><strong>AI Registration:</strong> ${player["ai-registration"] || "N/A"}</p>
                <p><strong>Alliance League Points:</strong> ${player.al_points || "0"}</p>
                <p><strong>District Showdown Points:</strong> ${player.district_showdown_points || "0"}</p>
                <p><strong>Merit:</strong> ${player["merit_reward_received.3"] || "N/A"}</p>
              </details>
            </div>
          </div>
        `;
        card.addEventListener("mouseenter", () => {
  card.classList.add("flipping");
  setTimeout(() => card.classList.remove("flipping"), 400);
});

        grid.appendChild(card);
      });
    })
    .catch((err) => console.error("Error loading data:", err));
}

loadMonthData("MAY 2025");
