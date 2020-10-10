USE prod;
CREATE TABLE Apis (
    id INT PRIMARY KEY NOT NULL,
    name VARCHAR(255) NOT NULL,
    description BLOB NOT NULL,
    FOREIGN KEY (id) REFERENCES MajorEvents(id)
);

-- Create an array of links by referencing Apis.id with api_id entry
CREATE TABLE ApiLinks (
    id INT PRIMARY KEY NOT NULL,
    name VARCHAR(255) NOT NULL,
    link VARCHAR(255) NOT NULL,
    api_id INT NOT NULL
);