const User = require("../models/User");
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
    const { _id } = req.user;

    const data = await User.findOne({ _id }).select("projects");

    /* 
   ------------------------------------------------------------------------------------
    STATUS CODE 200 - OK
    =========================================================
    The HTTP 200 OK success status response code indicates that the request has succeeded.
   ------------------------------------------------------------------------------------
   */
    return res.status(200).json({
      success: true,
      count: data.projects.length,
      data: data.projects,
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
    const { _id } = req.user;

    const project = req.body;
    const data = await User.updateOne(
      { _id },
      {
        $push: {
          projects: project,
        },
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
  try {
    const project_id = req.params.id;
    const user_id = req.user._id;
    console.log(project_id);
    // ---------------------------
    // CHECK IF THE PROJECT EXISTS
    // ---------------------------
    // User.findOne({username})
    // |
    // └→ Find the user with this username
    //
    // .select({projects: {$elemMatch: { _id: id }}})
    // |
    // └→ Select that user's projects property, find all elements that match the specfied property
    //
    const project = await User.findOne({ _id: user_id }).select({
      projects: { $elemMatch: { _id: project_id } },
    });

    // --------------------------------------------------------
    // IF THE PROJECT DOES NOT EXIST, THEN RETURN 404 NOT FOUND
    // --------------------------------------------------------
    if (!project.projects.length) {
      return res.status(404).json({
        success: false,
        error: "No project found",
      });
    }

    // ------------------------------------------------
    // ELSE REMOVE THE SPECIFIED PROJECT FROM THE ARRAY
    // ------------------------------------------------
    // User.updateOne({_id: user_id})
    // |
    // └→ Find the user with this user id
    //
    // {$pull: {projects: { _id: id }}})
    // |
    // └→ Select that user's projects property, remove the element that matches the ID from the array
    //
    await User.updateOne(
      { _id: user_id },
      {
        $pull: {
          projects: { _id: project_id },
        },
      }
    );

    // ---------------------------------------
    // OPERATION SUCCESSFUL, RETURN 200 STATUS
    // ---------------------------------------
    return res.status(200).json({
      success: true,
      data: {},
    });
  } catch (err) {
    // -------------------------------------------------
    // SOMETHING WENT WRONG THE SERVER'S END, 500 STATUS
    // -------------------------------------------------
    return res.status(500).json({
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
