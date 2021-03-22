INSERT INTO user_info (given_name, family_name, nickname, name, picture, email, sub)
VALUES ('John', 'Manack', 'jmnck28', 'John Manack', 'https://lh3.googleusercontent.com/a-/AOh14Gg0XNMlJiLLOqosNRjwepxQ-Rg5TwDwbTqT44ctpw=s96-c','jmnck28@gmail.com', 'google-oauth2|106823713440282669958');

INSERT INTO activities (title, details, is_complete, is_billable, user_reference)
VALUES
('Leslie Knope Return', 'Form 1040 Preparation', FALSE, TRUE, 1),
('Ron Swanson Return', 'Form 1065 Preparation', FALSE, TRUE, 1),
('April Ludgate Return', 'Form 706 Preparation', FALSE, TRUE, 1),
('Tom Haverford Project', 'Rent vs Buy Analysis', FALSE, TRUE, 1),
('Andy Dwyer Return', 'Form 1120-S Preparation', FALSE, TRUE, 1);

INSERT INTO nested_notes (note_entry, activity_reference)
VALUES
('See capital gains schedule from last year', 1),
('See dividends schedule from last year', 2),
('See interest schedule from last year', 3);

INSERT INTO nested_hours (hours_entry, hours_description, activity_reference)
VALUES
(1, 'File rollforward', 1),
(2, 'File rollforward', 2),
(3, 'File rollforward', 3),
(4, 'File rollforward', 4);

INSERT INTO user_favorites (activity_reference)
VALUES 
(1),
(5);