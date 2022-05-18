function PermissionChecker(permission) {
  return (req, res, next) => {
    if (req.user.permissions.includes(permission)) return next()

    res.status(400).send(`You do not have permission (${permission}) for this action.`)
  }
}

const DatabaseRequestHandler = async (res, collection, querry) => {
  try {
    let data = await collection.find(querry).toArray()

    if (!data) return res.status(400).send('Didnt find any data..')

    return res.status(200).send(data)
  } catch (e) {
    return res.status(400).send('Something went wrong...' + e)
  }
}

module.exports = {
  admin: PermissionChecker('admin'),
  manager: PermissionChecker('manager'),
  user: PermissionChecker('user'),
  DatabaseRequestHandler: DatabaseRequestHandler,
}
