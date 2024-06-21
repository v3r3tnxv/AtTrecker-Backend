CREATE TABLE IF NOT EXISTS Roles (
    role_id SERIAL PRIMARY KEY,
    role_name VARCHAR(20) NOT NULL
);

CREATE TABLE IF NOT EXISTS Users (
    user_id SERIAL PRIMARY KEY,
    user_login VARCHAR(50) NOT NULL,
    user_password VARCHAR(50) NOT NULL,
    role_id INT NOT NULL,
    FOREIGN KEY (role_id) REFERENCES Roles(role_id)
);

CREATE TABLE IF NOT EXISTS Week_Types (
    week_type_id SERIAL PRIMARY KEY,
    week_type_name VARCHAR(20) NOT NULL
);

CREATE TABLE IF NOT EXISTS Week_Days (
    week_day_id SERIAL PRIMARY KEY,
    week_day_name VARCHAR(20) NOT NULL
);

CREATE TABLE IF NOT EXISTS Lesson_Types (
    lesson_type_id SERIAL PRIMARY KEY,
    lesson_type_name VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS Statuses (
    status_id SERIAL PRIMARY KEY,
    status_name VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS Subjects (
    subject_id SERIAL PRIMARY KEY,
    subject_name VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS Teachers (
    teacher_id SERIAL PRIMARY KEY,
    teacher_surname VARCHAR(50) NOT NULL,
    teacher_name VARCHAR(50) NOT NULL,
    teacher_patronymic VARCHAR(50) NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

CREATE TABLE IF NOT EXISTS Groups (
    group_id SERIAL PRIMARY KEY,
    group_name VARCHAR(50) NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

CREATE TABLE IF NOT EXISTS SubGroups (
    subgroup_id SERIAL PRIMARY KEY,
    subgroup_name VARCHAR(50) NOT NULL,
    group_id INT NOT NULL,
    FOREIGN KEY (group_id) REFERENCES Groups(group_id)
);

CREATE TABLE IF NOT EXISTS Students (
    student_id SERIAL PRIMARY KEY,
    student_surname VARCHAR(50) NOT NULL,
    student_name VARCHAR(50) NOT NULL,
    student_patronymic VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS Students_Groups (
    student_group_id SERIAL PRIMARY KEY,
    group_id INT NOT NULL,
    student_id INT NOT NULL,
    FOREIGN KEY (group_id) REFERENCES Groups(group_id),
    FOREIGN KEY (student_id) REFERENCES Students(student_id)
);

CREATE TABLE IF NOT EXISTS Lessons (
    lesson_id SERIAL PRIMARY KEY,
    group_id INT NOT NULL,
    teacher_id INT NOT NULL,
    subject_id INT NOT NULL,
    lesson_number INT NOT NULL,
    lesson_type_id INT NOT NULL,
    week_type_id INT NOT NULL,
    week_day_id INT NOT NULL,
    semester INT NOT NULL,
    FOREIGN KEY (group_id) REFERENCES Groups(group_id),
    FOREIGN KEY (teacher_id) REFERENCES Teachers(teacher_id),
    FOREIGN KEY (subject_id) REFERENCES Subjects(subject_id),
    FOREIGN KEY (lesson_type_id) REFERENCES Lesson_Types(lesson_type_id),
    FOREIGN KEY (week_type_id) REFERENCES Week_Types(week_type_id),
    FOREIGN KEY (week_day_id) REFERENCES Week_Days(week_day_id)
);

CREATE TABLE IF NOT EXISTS Lesson_Visits (
    lesson_visit_id SERIAL PRIMARY KEY,
    lesson_id INT NOT NULL,
    student_id INT NOT NULL,
    status_id INT NOT NULL,
    FOREIGN KEY (lesson_id) REFERENCES Lessons(lesson_id),
    FOREIGN KEY (student_id) REFERENCES Students(student_id),
    FOREIGN KEY (status_id) REFERENCES Statuses(status_id)
);

CREATE TABLE IF NOT EXISTS Lessons_done (
    lesson_done_id SERIAL PRIMARY KEY,
    lesson_id INT NOT NULL,
    lesson_theme VARCHAR(255) NOT NULL,
    lesson_date DATE NOT NULL,
    lesson_done_description VARCHAR(255) NOT NULL,
    FOREIGN KEY (lesson_id) REFERENCES Lessons(lesson_id)
);

