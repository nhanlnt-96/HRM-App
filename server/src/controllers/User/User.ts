import { Request, Response } from 'express';
import {
  checkPhoneNumber,
  checkUserCardId,
  checkUserExist,
  convertToUsername,
  createUserAllowanceFunc,
  createUserCertificationFunc,
  createUserContractFunc,
  createUserFunc,
  createUserInfoFunc,
  createUserPositionFunc,
  getAllUserFunc,
} from './Business';
import { ApiError, ApiSuccess } from '../../shared/helper';
import { validationResult } from 'express-validator';

export const getAllUser = async (req: Request, res: Response) => {
  try {
    const workingPosition = await getAllUserFunc();
    ApiSuccess(200, workingPosition, res);
  } catch (error) {
    ApiError(400, error, res);
  }
};

export const createUser = async (req: Request, res: Response) => {
  const userInput = req.body;
  const errors = validationResult(req);
  const usernameConverted = convertToUsername(userInput.fullName);
  const recordCheckUsername = await checkUserExist(usernameConverted);
  if (recordCheckUsername.length === 0) {
    userInput.username = usernameConverted;
  } else {
    userInput.username = `${usernameConverted}${recordCheckUsername.length}`;
  }
  if (errors.isEmpty()) {
    const recordCheckCardId = await checkUserCardId(userInput.cardId);
    const recordCheckPhoneNumber = await checkPhoneNumber(userInput.phoneNumber);
    if (!recordCheckCardId && !recordCheckPhoneNumber) {
      try {
        const {
          allowance,
          allowanceDescription,
          contractDescription,
          contractFrom,
          contractTo,
          certificationUrl,
          certificationDescription,
        } = userInput;
        const createUserAccountRes = await createUserFunc(userInput);
        userInput.userId = createUserAccountRes.id;
        const createUserInfoRes = await createUserInfoFunc(userInput);
        const createUserAllowanceRes = allowance && allowanceDescription && (await createUserAllowanceFunc(userInput));
        const createUserContractRes =
          ((contractDescription && contractFrom) || contractTo) && (await createUserContractFunc(userInput));
        const createUserCertificationRes =
          certificationUrl && certificationDescription && (await createUserCertificationFunc(userInput));
        const createUserPositionRes = await createUserPositionFunc(userInput);
        ApiSuccess(
          201,
          {
            userAccount: createUserAccountRes,
            userInfo: createUserInfoRes,
            userAllowance: createUserAllowanceRes,
            userContract: createUserContractRes,
            userCertification: createUserCertificationRes,
            userPosition: createUserPositionRes,
          },
          res,
        );
      } catch (error) {
        ApiError(400, error, res);
      }
    } else {
      recordCheckCardId && recordCheckPhoneNumber
        ? ApiError(
            400,
            {
              cardId: `Card ID ${userInput.cardId} already exist.`,
              phoneNumber: `Phone number ${userInput.phoneNumber} already exist.`,
            },
            res,
          )
        : recordCheckCardId
        ? ApiError(400, `Card ID ${userInput.cardId} already exist.`, res)
        : ApiError(400, `Phone number ${userInput.phoneNumber} already exist.`, res);
    }
  } else {
    ApiError(400, errors.array(), res);
  }
};
