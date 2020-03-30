CREATE TABLE tasks (
  taskId INT AUTO_INCREMENT, 
  taskText VARCHAR(80), 
  completed BOOLEAN, 
  taskTimer INT, 
  PRIMARY KEY (taskId)
);

INSERT INTO tasks (taskText, completed, taskTimer) VALUES ("make dinner", false, 80);
INSERT INTO tasks (taskText, completed, taskTimer) VALUES ("walk the dog", true, 120);