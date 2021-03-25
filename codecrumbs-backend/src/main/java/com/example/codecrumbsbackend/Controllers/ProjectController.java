package com.example.codecrumbsbackend.Controllers;

import com.example.codecrumbsbackend.Models.Limit;
import com.example.codecrumbsbackend.Models.Project;
import com.example.codecrumbsbackend.Models.ProjectUser;
import com.example.codecrumbsbackend.Models.Search;
import com.example.codecrumbsbackend.Repositories.ProjectRepository;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Slf4j
public class ProjectController {

    @Autowired
    ProjectRepository projectRepository;

    //BASIC INFO
    @ApiOperation(value = "Creates new project -- REQUIRED: associatedUserId, name, numberOfSearches (default 0)")
    @PostMapping("/new-project")
    public Project postNewProject(@RequestBody Project project) {
        return projectRepository.postNewProject(project);
    }

    @ApiOperation(value = "Get project info by name -- REQUIRED: projectName, userId")
    @GetMapping("/project-by-name")
    public Project getProjectByName(@RequestBody ProjectUser projectUser) {
        return projectRepository.getProjectByName(projectUser);
    }

    @ApiOperation(value = "Get all projects -- REQUIRED: Path variable userId")
    @GetMapping("/all-projects/{userId}")
    public List<Project> getAllProjects(@PathVariable("userId") String userId) {
        return projectRepository.getAllProjects(userId);
    }

    //SEARCH HISTORY
    @ApiOperation(value = "Creates new search -- REQUIRED: associatedProjectName, associatedUserId, websiteName, websiteUrl")
    @PostMapping("/new-search")
    public Search addNewSearch(@RequestBody Search search) {
        return projectRepository.addNewSearch(search);
    }

    @ApiOperation(value = "Returns specified number of most recent searches -- REQUIRED: limit, projectUser")
    @GetMapping("/most-recent-limited-searches")
    public List<Search> getMostRecentSearchesLimited(@RequestBody Limit limit) {
        return projectRepository.getMostRecentSearchesLimited(limit.getLimit(), limit.getProjectUser());
    }

    @ApiOperation(value = "Toggles search as starred or unstarred -- REQUIRED: associatedProjectName, associatedUserId, starred, websiteId")
    @PutMapping("/star-search") //can either set starred to true or false
    public Search starSearch(@RequestBody Search search) { //only websiteId (searchId), associatedUserId, and associatedProjectName, starred
        return projectRepository.starSearch(search);
    }
    //Add filtering keywords to filter search history

    @ApiOperation(value = "Deletes search entry -- REQUIRED: associatedProjectName, associatedUserId, websiteId")
    @DeleteMapping("/delete-search")
    public Search deleteSearch(@RequestBody Search search) {
        return projectRepository.deleteSearch(search);
    }

    @ApiOperation(value = "Deletes project entry -- REQUIRED: associatedUserId, name")
    @DeleteMapping("/delete-project")
    public Project deleteProject(@RequestBody Project project) {
        return projectRepository.deleteProject(project);
    }

}
