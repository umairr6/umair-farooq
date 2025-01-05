const unit1Images = 34;
const unit2Images = 34; // Adjust this for actual Unit 2 count
const modal = document.getElementById("image-modal");
const modalImg = document.getElementById("preview-image");
const closeModal = document.querySelector(".close");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

let currentImageIndex = 0;
let currentUnit = null;

// Load images
function loadImages(unit, folder) {
    const container = document.getElementById(`${unit}-images`);
    for (let i = 1; i <= (unit === "unit1" ? unit1Images : unit2Images); i++) {
        const img = document.createElement("img");
        img.src = `${folder}/Note ${i}.jpg`;
        img.alt = `Note ${i}`;
        img.dataset.index = i - 1;
        img.dataset.unit = unit;
        img.addEventListener("click", () => openModal(img.dataset.unit, i - 1));
        container.appendChild(img);
    }
}

// Open modal
function openModal(unit, index) {
    currentUnit = unit;
    currentImageIndex = index;
    modal.style.display = "flex";
    updateModalImage();
}

// Update modal image
function updateModalImage() {
    const folder = currentUnit === "unit1" ? "DTS UNIT 1" : "DTS UNIT 2";
    modalImg.src = `${folder}/Note ${currentImageIndex + 1}.jpg`;
}

// Close modal
closeModal.addEventListener("click", () => {
    modal.style.display = "none";
});

// Navigate images
prevBtn.addEventListener("click", () => {
    if (currentImageIndex > 0) {
        currentImageIndex--;
        updateModalImage();
    }
});

nextBtn.addEventListener("click", () => {
    if (
        currentImageIndex <
        (currentUnit === "unit1" ? unit1Images : unit2Images) - 1
    ) {
        currentImageIndex++;
        updateModalImage();
    }
});

// Function to download a single file or multiple files
function downloadFile(filePaths) {
    if (Array.isArray(filePaths)) {
        filePaths.forEach((filePath, index) => {
            setTimeout(() => {
                const link = document.createElement('a');
                link.href = filePath;
                link.download = filePath.split('/').pop();
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }, index * 200); // Adding delay to ensure all files are downloaded
        });
    } else {
        const link = document.createElement('a');
        link.href = filePaths;
        link.download = filePaths.split('/').pop();
        link.click();
    }
}

// Function to download all files for a unit
function downloadAll(unit) {
    const files = [];
    const totalImages = unit === 'unit1' ? unit1Images : unit2Images;
    const folder = unit === 'unit1' ? 'DTS UNIT 1' : 'DTS UNIT 2';

    for (let i = 1; i <= totalImages; i++) {
        files.push(`${folder}/Note ${i}.jpg`);
    }

    downloadFile(files);
}

// Event listeners for download buttons
document.getElementById("download-unit1").addEventListener("click", () => {
    downloadAll('unit1');
});

document.getElementById("download-unit2").addEventListener("click", () => {
    downloadAll('unit2');
});

document.getElementById("download-all").addEventListener("click", () => {
    const allFiles = [];
    for (let i = 1; i <= unit1Images; i++) {
        allFiles.push(`DTS UNIT 1/Note ${i}.jpg`);
    }
    for (let i = 1; i <= unit2Images; i++) {
        allFiles.push(`DTS UNIT 2/Note ${i}.jpg`);
    }
    downloadFile(allFiles);
});

// Load all images on page load
loadImages("unit1", "DTS UNIT 1");
loadImages("unit2", "DTS UNIT 2");
