import User from '../Models/singleSignInModel.js';

export async function signIn(req, res) {
    const { name, email, token } = req.body;
    const userAgent = req.headers["user-agent"];
    try {
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            const newUser = await User.create({ name, email, token, userAgent });
            return res.status(200).json({ newUser });
        }
        else if (existingUser && userAgent === existingUser.userAgent) {
            return res.status(200).json({ existingUser });
        }
        else if (existingUser && userAgent !== existingUser.userAgent) {
            res.status(201).json({ existingUser });
        }

    } catch (error) {
        console.log(error);
    }
}

export async function signOut(req, res) {
    const { email } = req.body;
    try {
        await User.findOneAndRemove({ email });
        res.status(200).json({ message: `Successfully signed Out ${email} user` })
    } catch (error) {
        console.log(error);
    }
}

export async function signOutOthers(req, res) {
    const { name, email, token } = req.body;
    const userAgent = req.headers["user-agent"];
    try {
        const newUser = await User.findOneAndUpdate({ email }, { name, email, token, userAgent }, { new: true });
        return res.status(200).json({ message: "Successfully SignedOut & Signed In", newUser });

    } catch (error) {
        console.log(error);
    }
}