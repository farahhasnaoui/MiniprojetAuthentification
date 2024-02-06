import { Request, Response } from 'express';
import * as userService from './authservice';

export const register = async (req: Request, res: Response) => {
  try {
    // Récupérer le chemin de l'image de profil si un fichier est téléchargé
    const profileImagePath = req.file ? req.file.path : undefined;

    // Appeler createUser avec les données de l'utilisateur et le chemin de l'image de profil
    const user = await userService.createUser(req.body, profileImagePath);

    res.status(201).json({ message: 'User created successfully', user });
  } catch (error) {
    const errorMessage = (error instanceof Error) ? error.message : 'An error occurred during registration';
    res.status(400).json({ message: errorMessage });
  }
};

export const loginController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const tokens = await userService.login({ email, password });
    res.json(tokens);
  } catch (error) {
    const errorMessage = (error instanceof Error) ? error.message : 'User not found';
    res.status(401).send(errorMessage);
  }
};

export const profile = async (req: any, res: Response) => {
  try {
    const user = await userService.findUserById(req.user.id);
    res.json(user);
  } catch (error) {
    const errorMessage = (error instanceof Error) ? error.message : 'User not found';
    res.status(404).send(errorMessage);
  }
};


export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    // Ensure search is a string and not empty
    const search = typeof req.query.search === 'string' && req.query.search.trim() ? req.query.search.trim() : undefined;

    // Call the service function with or without the search parameter
    const result = search !== undefined
      ? await userService.getAllUsers(page, limit, search)
      : await userService.getAllUsers(page, limit);

    res.json(result);
  } catch (error) {
      const errorMessage = (error instanceof Error) ? error.message : 'An error occurred while fetching users';
    res.status(409).send(errorMessage);
  }
};

