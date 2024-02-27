// Let's write a JavaScript function that takes the JSON structure and dynamically generates the HTML

// Since the actual crafting of the code does not require execution, we'll prepare the function as a string.
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
                subfoldersHTML = '<ul>' + folder.subfolders.map(createFolderHTML).join('') + '</ul>';
            }
            return '<li><a href="javascript:void(0);">' + folder.name + '</a>' + subfoldersHTML + '</li>';
        }

        var htmlStructure = '<ul>' + createFolderHTML(folderStructure) + '</ul>';
        $('#dynamic-folder-structure').html(htmlStructure);

        // Re-attach the click event logic for the dynamically created elements
        $('.oid-tree li').off('click').on('click', function (e) {
            var children = $(this).find('> ul');
            if (children.is(":visible")) children.hide('fast').removeClass('active');
            else children.show('fast').addClass('active');
            e.stopPropagation();
        });
    });
}

// Call the function to load and display the folder structure
$(document).ready(function () {
    loadFolderStructure();
});


