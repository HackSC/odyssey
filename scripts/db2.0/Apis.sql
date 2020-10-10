USE prod;
CREATE TABLE Apis (
    id INT PRIMARY KEY NOT NULL,
    name VARCHAR(255) NOT NULL,
    description BLOB NOT NULL,
    link VARCHAR(255) NOT NULL,
    FOREIGN KEY (id) REFERENCES MajorEvents(id)
);