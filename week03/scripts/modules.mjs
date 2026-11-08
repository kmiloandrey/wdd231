// 1. Import byuiCourse as a default export
import byuiCourse from './course.mjs';

// 2. Import setSectionSelection as a named export
import { setSectionSelection } from './sections.mjs';

// 3. Import setTitle and renderSections as named exports
import { setTitle, renderSections } from './output.mjs';

// 4. Event listeners that handle the state change and re-render the view
document.querySelector("#enrollStudent").addEventListener("click", function () {
    const sectionNum = Number(document.querySelector("#sectionNumber").value);
    byuiCourse.changeEnrollment(sectionNum);
    renderSections(byuiCourse.sections); // Re-renders the updated sections list
});

document.querySelector("#dropStudent").addEventListener("click", function () {
    const sectionNum = Number(document.querySelector("#sectionNumber").value);
    byuiCourse.changeEnrollment(sectionNum, false);
    renderSections(byuiCourse.sections); // Re-renders the updated sections list
});

// Initial page setup on load
setTitle(byuiCourse);
setSectionSelection(byuiCourse.sections);
renderSections(byuiCourse.sections);