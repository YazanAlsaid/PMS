package edu.fra.uas.parking.security.model;

import edu.fra.uas.parking.common.Util;
import edu.fra.uas.parking.entity.User;
import org.springframework.security.core.authority.AuthorityUtils;

import java.util.Objects;

public class CurrentUser extends org.springframework.security.core.userdetails.User {

    private User user;

    public CurrentUser(User user) {
        super(user.getEmail(), user.getPassword(),
                AuthorityUtils.createAuthorityList(Util.convertRoleToListOfString(user.getRoles()).toArray(new String[0])));
        this.user = user;
    }

    public User getUser() {
        return user;
    }

    public Long getId() {
        return user.getId();
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        if (!super.equals(o)) return false;
        CurrentUser that = (CurrentUser) o;
        return user.equals(that.user);
    }

    @Override
    public int hashCode() {
        return Objects.hash(super.hashCode(), user);
    }

    @Override
    public String toString() {
        return "CurrentUser{" +
                "user=" + user +
                "} " + super.toString();
    }

}
