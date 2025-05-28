document.addEventListener('DOMContentLoaded', function() {
    // Sélectionner tous les éléments nécessaires
    const plusButtons = document.querySelectorAll('.fa-plus-circle');
    const minusButtons = document.querySelectorAll('.fa-minus-circle');
    const deleteButtons = document.querySelectorAll('.fa-trash-alt');
    const likeButtons = document.querySelectorAll('.fa-heart');
    const quantityElements = document.querySelectorAll('.quantity');
    const unitPrices = document.querySelectorAll('.unit-price');
    const totalPriceElement = document.querySelector('.total');
    const cards = document.querySelectorAll('.card');

    // Initialiser les quantités et les états "like"
    let quantities = Array(quantityElements.length).fill(0);
    let likedStates = Array(likeButtons.length).fill(false);

    // Fonction pour calculer le prix total
    function calculateTotal() {
        let total = 0;
        quantityElements.forEach((quantityElement, index) => {
            const quantity = quantities[index];
            const priceText = unitPrices[index].textContent;
            const price = parseFloat(priceText.replace(' $', ''));
            total += quantity * price;
        });
        totalPriceElement.textContent = total + ' $';
    }

    // Gestion des boutons +
    plusButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            quantities[index]++;
            quantityElements[index].textContent = quantities[index];
            calculateTotal();
        });
    });

    // Gestion des boutons -
    minusButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            if (quantities[index] > 0) {
                quantities[index]--;
                quantityElements[index].textContent = quantities[index];
                calculateTotal();
            }
        });
    });

    // Gestion des boutons de suppression
    deleteButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            // Supprimer la carte parente
            cards[index].parentElement.remove();
            // Mettre à jour les tableaux et recalculer
            quantities.splice(index, 1);
            likedStates.splice(index, 1);
            calculateTotal();
        });
    });

    // Gestion des boutons "like"
    likeButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            likedStates[index] = !likedStates[index];
            if (likedStates[index]) {
                button.style.color = 'red';
            } else {
                button.style.color = '';
            }
        });
    });

    // Initialiser le total à 0
    calculateTotal();
});