const { User } = require("../models/User");
const { Project, Bug } = require("../models/Project");

/* 
------------------------------------------------------------------------------------
  
  CONTROLLERS FOR PROJECTS, "/api/v1/projects"

------------------------------------------------------------------------------------
*/

// @desc Get ALL projects
// @route GET /api/v1/projects
// @access Public
// Add the ability to get just one project later?
exports.getProjects = async (req, res, next) => {
  try {
    const { username } = req.user;
    const projects = await User.findOne({ username }).select("projects");

    /* 
   ------------------------------------------------------------------------------------
    STATUS CODE 200 - OK
    =========================================================
    The HTTP 200 OK success status response code indicates that the request has succeeded.
   ------------------------------------------------------------------------------------
   */
    return res.status(200).json({
      success: true,
      count: projects.length,
      data: projects,
    });
  } catch (err) {
    return res.send(500).json({
      success: false,
      error: err.message,
    });
  }
};

// @desc add project
// @route POST /api/v1/projects
// @access Public
exports.addProject = async (req, res, next) => {
  try {
    const { username } = req.user;
    console.log(req.user);
    const project = req.body;
    const data = await User.update(
      { username: username },
      {
        $push: {
          projects: project,
        },
        done,
      }
    );

    /* 
   ------------------------------------------------------------------------------------
    STATUS CODE 201 - CREATED
    =========================================================
    The HTTP 201 Created success status response code 
    indicates that the request has succeeded and has led to the creation of a resource.
   ------------------------------------------------------------------------------------
   */
    return res.status(201).json({
      success: true,
      data: data,
    });
  } catch (err) {
    console.log(req.user);
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
  res.send("POST request");
};

// @desc delete projects
// @route DELETE /api/v1/projects/:id
// @access Public
exports.deleteProject = async (req, res, next) => {
  console.log("here!");
  try {
    const { id } = req.params;
    console.log(id);
    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({
        success: false,
        error: "No project found",
      });
    }

    await project.remove();
    return res.status(200).json({
      success: true,
      data: {},
    });
  } catch (err) {
    return res.send(500).json({
      success: false,
      error: err.message,
    });
  }
};

/* 
------------------------------------------------------------------------------------
  
  CONTROLLERS FOR BUGS, "/api/v1/projects/:id/bugs"

------------------------------------------------------------------------------------
*/

// @desc Get ALL bugs for a project
// @route GET /api/v1/projects
// @access Public
exports.getBugs = async (req, res, next) => {
  try {
  } catch (err) {}
};
