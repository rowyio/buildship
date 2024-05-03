<script>

    // Function to fetch data from the API
    function fetchData() {
      const apiUrl = 'https://0dc3ke.buildship.run/webflowapi'; // Replace with your API URL

      fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
          displayData(data);
        })
        .catch(error => {
          console.error('Error fetching data from the API:', error);
        });
    }

	function displayData(data) {
      const dataContainer = document.getElementById('card-grid');
    
      // Loop through the data and create a card for each item
      data.forEach(item => {
        const sampleCard = document.getElementById('sample-card');

        if (!sampleCard) {
          console.error('Sample card element not found');
          console.error('Make sure to add the id "card-grid" to the card grid');
        }

        const card = sampleCard.cloneNode(true);

        card.setAttribute('id', '');
        card.style.display = 'block';

        const title = card.querySelector('.card-title');
        title.textContent = item.file;

        const description = card.querySelector('.card-description');
        description.textContent = item.description;

        const price = card.querySelector('.card-price');
        price.textContent = '$' + item.price;

        dataContainer.appendChild(card);
      });
    }
  
   window.onload = fetchData;
  </script>
