CREATE TABLE activities (
    id serial PRIMARY KEY,
    title varchar(2000),
    details varchar(10000),
    is_complete boolean,
    is_billable boolean,
    is_favorite boolean,
    user_sub varchar(300)
);

CREATE TABLE nested_notes (
    id serial PRIMARY KEY,
    note_entry varchar (10000),
    activity_reference integer REFERENCES activities (id)
);

CREATE TABLE nested_hours (
    id serial PRIMARY KEY,
    hours_entry float,
    hours_description varchar(2000),
    activity_reference integer REFERENCES activities (id)
);