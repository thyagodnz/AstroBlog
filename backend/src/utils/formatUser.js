export function formatUser(user) {
    const userObj = user.toObject ? user.toObject() : { ...user }

    return {
        id: userObj._id,
        name: userObj.name,
        bio: userObj.bio,
        collaborator: userObj.collaborator
    }
}

export function formatMe(user) {
    const userObj = user.toObject ? user.toObject() : { ...user }

    return {
        id: userObj._id,
        name: userObj.name,
        email: userObj.email,
        bio: userObj.bio,
        collaborator: userObj.collaborator
    }
}