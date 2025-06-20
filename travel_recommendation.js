/*  travel_recommendation.js
    ----------------------------------------------------------
    Loads travel_recommendation_api.json, renders everything
    into #MainRight, and adds an exact‑match search.
    Handles the extra “cities” array that appears only under
    the “countries” category by flattening it on the fly.
    ---------------------------------------------------------- */

    fetch("travel_recommendation_api.json")
    .then(res => res.json())
    .then(data => {
      const DATA = data;                       // keep JSON in scope
      const out  = document.getElementById("MainRight");
  
      /* ---------- first render: show every place ---------- */
      let html = "";
      for (const category in DATA) {
        const places = DATA[category];         // array: countries / temples / beaches
  
        for (const site of places) {
  
          /* EXTRA LOOP: drill into site.cities if it exists */
          const items = site.cities ? site.cities : [site];
  
          for (const item of items) {
            html += `
              <p>${item.id ?? ""}</p>
              <p>${item.name}</p><br>
              <img src="${item.imageUrl}" alt="${item.name}" /><br>
              <p>${item.description}</p>
              <hr />
            `;
          }
        }
      }
      out.innerHTML = html;

      
  
      /* ---------- search by exact name (case‑insensitive) ---------- */
      function SearchFunctionality() {
        const value = document
          .getElementById("destInput")
          .value
          .toLowerCase()
          .trim();
  
        /* Build the filtered markup */
        let resultHTML = "";
        for (const category in DATA) {
          const places = DATA[category];
  
          for (const site of places) {
  
            /* EXTRA LOOP again for nested cities */
            const items = site.cities ? site.cities : [site];
  
            for (const item of items) {
              if (item.name.toLowerCase() === value) {
                resultHTML += `
                  <p>${item.id ?? ""}</p>
                  <p>${item.name}</p><br>
                  <img src="${item.imageUrl}" alt="${item.name}" /><br>
                  <p>${item.description}</p>
                  <hr />
                `;
              }
            }
          }
        }
  
        out.innerHTML = resultHTML || "<p>No match found.</p>";
      }
  
      /* ---------- hook up the button (pass the function, don’t call) ---------- */
      document
        .getElementById("searchBtn")
        .addEventListener("click", SearchFunctionality);

        document.getElementById("resetBtn").addEventListener("click", clearResult);
        function clearResult(){
            out.innerHTML = "";
            for (const category in DATA) {
                const places = DATA[category];         // array: countries / temples / beaches
          
                for (const site of places) {
          
                  /* EXTRA LOOP: drill into site.cities if it exists */
                  const items = site.cities ? site.cities : [site];
          
                  for (const item of items) {
                    html += `
                      <p>${item.id ?? ""}</p>
                      <p>${item.name}</p><br>
                      <img src="${item.imageUrl}" alt="${item.name}" /><br>
                      <p>${item.description}</p>
                      <hr />
                    `;
                  }
                }
              }
              out.innerHTML = html;
    } 

    })

    .catch(err => console.error("There is some error:", err));
  