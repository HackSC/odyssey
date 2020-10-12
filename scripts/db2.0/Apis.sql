CREATE TABLE Apis (
    id INT PRIMARY KEY NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    major_event INT NOT NULL
);

-- Create an array of links by referencing Apis.id with api_id entry
CREATE TABLE ApiLinks (
    id INT PRIMARY KEY NOT NULL,
    name VARCHAR(255) NOT NULL,
    link VARCHAR(255) NOT NULL,
    api_id INT NOT NULL,
    FOREIGN KEY (api_id) REFERENCES Apis(id) 
);