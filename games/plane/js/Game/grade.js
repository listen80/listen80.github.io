
export function createGrade({ container }) {
    const grade = new PIXI.Text()
    grade.y = 80
    grade.x = 34
    grade.style.fill = "#000080"
    grade.setTextsetText = function (scores) {
        grade.text = "等级:" + scores + "级"
    }
    return grade;
}
