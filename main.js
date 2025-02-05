let form = document.querySelector('form');
let btn = document.querySelector('.btn');
let ul = document.querySelector('ul');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    let inputName = document.querySelector('.inputName');
    let inputValue = inputName.value.trim();

    if (!inputValue) {
        alert('Please enter a name.');
        return;
    }

    try {
        let response = await fetch(`https://api.nationalize.io/?name=${inputValue}`);
        let answer = await response.json();

        if (!answer.country || answer.country.length === 0) {
            ul.innerHTML = '<li>No results found.</li>';
            return;
        }

        btn.onclick = () => {
            ul.innerHTML = ''; 
            answer.country.forEach((item, index) => {
                let li = document.createElement('li');
                li.innerHTML = `${index + 1}: ${item.country_id}, Probability: ${Math.round(item.probability * 100)}% 
                  <img src="https://flagsapi.com/${item.country_id.toUpperCase()}/flat/64.png" onerror="this.style.display='none'">`;
                ul.appendChild(li);
            });
        };
    } catch (error) {
        console.error(error);
        ul.innerHTML = '<li>Error fetching data. Try again later.</li>';
    } finally {
        console.log('Request processed.');
    }
});
