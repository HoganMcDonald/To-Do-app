CREATE TABLE todo (
	id SERIAL PRIMARY KEY,
	task varchar(40),
	notes varchar(140),
	completed boolean
);

INSERT INTO todo (task, notes)
VALUES ('wash dishes', 'finish the dishes by 4:00'),
('walk the dog', 'Petey hasn''t been out for 4 hours and he just ate');
