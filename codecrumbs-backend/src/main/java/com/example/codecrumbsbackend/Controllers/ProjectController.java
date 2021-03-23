package com.example.codecrumbsbackend.Controllers;

import com.example.codecrumbsbackend.Models.Limit;
import com.example.codecrumbsbackend.Models.Project;
import com.example.codecrumbsbackend.Models.ProjectUser;
import com.example.codecrumbsbackend.Models.Search;
import com.example.codecrumbsbackend.Repositories.ProjectRepository;
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
    @PostMapping("/new-project")
    public Project postNewProject(@RequestBody Project project) {
        return projectRepository.postNewProject(project);
    }

    @PostMapping("/project-by-name")
    public Project getProjectByName(@RequestBody ProjectUser projectUser) {
        return projectRepository.getProjectByName(projectUser);
    }

    //SEARCH HISTORY
    @PostMapping("/new-search")
    public Search addNewSearch(@RequestBody Search search) {
        return projectRepository.addNewSearch(search);
    }

    @GetMapping("/most-recent-limited-searches")
    public List<Search> getMostRecentSearchesLimited(@RequestBody Limit limit) {
        return projectRepository.getMostRecentSearchesLimited(limit.getLimit(), limit.getProjectUser());
    }

    @PutMapping("/star-search") //can either set starred to true or false
    public Search starSearch(@RequestBody Search search) { //only websiteId (searchId), associatedUserId, and associatedProjectName, starred, and commitId need to be filled
        return projectRepository.starSearch(search);
    }
    //Add filtering keywords to filter search history
}
