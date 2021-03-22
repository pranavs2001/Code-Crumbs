package com.example.codecrumbsbackend.Controllers;

import com.example.codecrumbsbackend.Models.Project;
import com.example.codecrumbsbackend.Repositories.ProjectRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
public class ProjectController {

    @Autowired
    ProjectRepository projectRepository;

    @PostMapping("/new-project")
    public Project postNewProject(@RequestBody Project project) {
        return projectRepository.postNewProject(project);
    }
}
