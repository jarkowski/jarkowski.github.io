// This function will:
// - Parse the provided JSON structure.
// - Recursively build the HTML structure.
// - Inject the HTML into the designated container.

function loadFolderStructure() {
    // Load the JSON structure from 'structure.json'
    $.getJSON('structure.json', function (folderStructure) {
        function createFolderHTML(folder) {
            var subfoldersHTML = '';
            if (folder.subfolders && folder.subfolders.length > 0) {
                // Map through each subfolder and recursively call createFolderHTML
                subfoldersHTML = '<ul style="display: none;">' + folder.subfolders.map(createFolderHTML).join('') + '</ul>';
            }
            return '<li><a href="javascript:void(0);">' + '<div class="member-viewbox">' + '<div class="member-image">' + '<img src="Folder_Icon.svg" alt="Folder Icon"></img>' + '<div class="member-details">' + folder.name + '</div>' + '</div>' + '</div>' + '</a>' + subfoldersHTML + '</li>';
        }

        var htmlStructure = '<ul>' + createFolderHTML(folderStructure) + '</ul>';
        $('#dynamic-folder-structure').html(htmlStructure).find('> ul').show(); // Show only the first level

        // Re-attach the click event logic for the dynamically created elements
        $('#dynamic-folder-structure li > a').off('click').on('click', function (e) {
            var children = $(this).parent().find('> ul');
            if (children.is(":visible")) {
                children.hide('fast');
            } else {
                children.show('fast');
            }
            e.stopPropagation(); // Prevent the event from bubbling up to parent elements
        });
    });
}

// Call the function to load and display the folder structure
$(document).ready(function () {
    loadFolderStructure();
});


