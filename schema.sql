CREATE TABLE user_info (
    id serial PRIMARY KEY,
    first_name varchar(200),
    last_name varchar(200),
    email varchar (200),
    password varchar(2000)
);

CREATE TABLE activities (
    id serial PRIMARY KEY,
    title varchar(2000),
    details varchar(10000),
    is_complete boolean,
    is_billable boolean,
    user_reference integer REFERENCES user_info (id)
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

CREATE TABLE user_favorites (
    id serial PRIMARY KEY,
    activity_reference integer REFERENCES activities (id)
);