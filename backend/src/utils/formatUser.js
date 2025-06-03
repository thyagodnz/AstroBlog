function formatUser(user) {
    const userObj = user.toObject ? user.toObject() : { ...user }

    return {
        id: userObj._id,
        name: userObj.name,
        email: userObj.email,
        bio: userObj.bio,
        collaborator: userObj.collaborator,
        createdAt: userObj.createdAt
    }
}

export default formatUser
