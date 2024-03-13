(function (Drupal) {
  Drupal.behaviors.dynamicTaxonomyCheckboxSelection = {
    attach: function (context) {
      const checkboxes = context.querySelectorAll('.form-checkboxes input[type="checkbox"]');

      checkboxes.forEach(function(checkbox) {
        checkbox.addEventListener('change', function() {
          if (!this.checked) return; // Only proceed if the checkbox is checked

          // Determine the current depth based on the number of "-" in the label
          const currentDepth = (this.labels[0].innerText.match(/-/g) || []).length;
          const checkboxesArray = Array.from(checkboxes);
          const currentIndex = checkboxesArray.indexOf(this);

          // Check all children and descendants
          for (let i = currentIndex + 1; i < checkboxesArray.length; i++) {
            const nextCheckbox = checkboxesArray[i];
            const nextCheckboxDepth = (nextCheckbox.labels[0].innerText.match(/-/g) || []).length;

            if (nextCheckboxDepth > currentDepth) {
              nextCheckbox.checked = true;
            } else {
              break; // Stop if we've reached a checkbox of the same depth or moved up the hierarchy
            }
          }
        });
      });
    }
  };
})(Drupal);
