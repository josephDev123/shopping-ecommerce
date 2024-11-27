import html2canvas from "html2canvas";

export const handleDownloadAsImage = async (
  sectionId: string,
  filename: string = "section.png"
) => {
  const section = document.getElementById(sectionId);
  if (!section) {
    console.error(`No section found with id: ${sectionId}`);
    return;
  }

  const scrollPosition = window.scrollY;

  const originalOverflow = section.style.overflow;
  section.style.overflow = "visible";

  try {
    // this part dey Capture the entire section. naso nau
    const canvas = await html2canvas(section, {
      useCORS: true,
    });

    const dataUrl = canvas.toDataURL("image/png");

    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link); // Clean up
  } catch (error) {
    console.error("Failed to download the section:", error);
  } finally {
    // Restore the original overflow and scroll position
    section.style.overflow = originalOverflow;
    window.scrollTo(0, scrollPosition);
  }
};
