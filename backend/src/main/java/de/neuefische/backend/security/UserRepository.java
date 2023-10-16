package de.neuefische.backend.security;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<GithubUser, String> {
}
