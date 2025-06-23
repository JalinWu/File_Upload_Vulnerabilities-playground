const { exec } = require("child_process");
exec(
  "cd customer_info && ls && cat contact.txt",   /* Write your command here */
  (err, stdout, stderr) => {
    console.log(stdout);
  }
);
