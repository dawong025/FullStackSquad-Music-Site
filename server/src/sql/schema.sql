PRAGMA foreign_keys;

CREATE TABLE songs (
	id int NOT NULL PRIMARY KEY,
	song_title text NOT NULL,
	notes varchar NOT NULL
);

INSERT INTO songs (id, song_title, notes) 
VALUES (1, 'Ode to Joy (Dubstep Remix)', 'E4 E4 F4 G4 G4 F4 E4 D4 C4 C4 D4 E4 E4 D4 D4');

INSERT INTO songs (id, song_title, notes)
VALUES (2, 'Jingle Bells', 'E3 E3 E3 E3 E3 E3 E3 G5 C1 D2 E3 F4 F4 F4 F4 F4 E3 E3 E3 G5 G5 F4 D2 C1');

INSERT INTO songs(id, song_title, notes)
VALUES(3, 'AOT Opening S1', 'D4 D4 F4 E4 C4 C4 D4 D4 F4 E4 C4 A4 F4 G4 E4 F4 D4 E4 C4 A4 F4 G4 E4 F4 D4 E4 C4');

INSERT INTO songs(id, song_title, notes)
VALUES(4, 'Twinkle Little Star', 'C4 C4 G4 G4 A4 A4 G4 F4 F4 E4 E4 D4 D4 C4 G4 G4 F4 F4 E4 E4 D4 G4 G4 F4 F4 E4 E4 D4 C4 C4 G4 G4 A4 A4 G4 F4 F4 E4 E4 D4 D4 C4');
