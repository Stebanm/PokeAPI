const toggleDropdown = (content, button) => {
  const dropdownContent = document.getElementById(content),
    dropdownButton = document.getElementById(button);

  // Función para abrir el menú
  function openDropdown() {
    dropdownContent.classList.add("show-dropdown");
    document.addEventListener("click", closeDropdownOnClickOutside);
  }

  // Función para cerrar el menú
  function closeDropdown() {
    dropdownContent.classList.remove("show-dropdown");
    document.removeEventListener("click", closeDropdownOnClickOutside);
  }

  dropdownButton.addEventListener("click", (event) => {
    event.stopPropagation(); // Evitar que el evento llegue al documento y cierre el menú

    // Toggle para abrir o cerrar el menú
    if (dropdownContent.classList.contains("show-dropdown")) {
      closeDropdown();
    } else {
      openDropdown();
    }
  });

  function closeDropdownOnClickOutside(event) {
    // Cerrar el menú si se hace clic fuera del contenido del menú
    if (!dropdownContent.contains(event.target)) {
      closeDropdown();
    }
  }

  // Cierra el menú cuando se hace clic en un elemento dentro del menú
  dropdownContent.addEventListener("click", (event) => {
    closeDropdown();
  });
};

toggleDropdown("dropdown-content", "dropdown-button");
