import { useContext } from 'react';
import { ErrorContext, InfoContext, UserinfoContext } from '../components/App';
import ROLES from './roles';

export const useInfoContext = () => {
  const infoContext = useContext(InfoContext.context);
  return {
    context: infoContext,
    msg: msg => {
      infoContext.setValue({
        hasInfos: true,
        messageId: msg
      });
    },
    hide: () => {
      infoContext.setValue({
        hasInfos: false,
        messageId: ''
      });
    }
  };
};

export const useUserinfoContext = () => {
  const userInfoContext = useContext(UserinfoContext.context);
  const { userroles, userinfo } = userInfoContext.value;
  return {
    context: userInfoContext,
    isSupervisorInSc: sc => {
      return sc.supervisor && userinfo.userId === sc.supervisor.id;
    },
    isReviewerInSc: sc => {
      return (
        (sc.reviewer1 && userinfo.userId === sc.reviewer1.id) ||
        (sc.reviewer2 && userinfo.userId === sc.reviewer2.id)
      );
    },
    isOwnerInSc: sc => {
      return sc.employee && sc.employee.id === userinfo.userId;
    },
    hasRoleAdmin: () => {
      return userroles.includes(ROLES.ADMIN);
    },
    hasRoleHr: () => {
      return userroles.includes(ROLES.PERSONAL_DEV);
    },
    hasRoleEmployee: () => {
      return userroles.includes(ROLES.EMPLOYEE);
    },
    hasRoleSupervisor: () => {
      return userroles.includes(ROLES.SUPERVISOR);
    },
    hasNoRole: () => {
      return userroles.length === 0;
    }
  };
};

export const useErrorContext = () => {
  const errorContext = useContext(ErrorContext.context);
  return {
    context: errorContext,
    showGeneral: () => {
      errorContext.setValue({
        hasErrors: true,
        messageId: 'message.error'
      });
    },
    hide: () => {
      errorContext.setValue({ hasErrors: false, messageId: '' });
    },
    hasError: error => {
      return errorContext.value.errors && errorContext.value.errors[error];
    },
    show: (msgId, errors) => {
      errorContext.setValue(
        errors
          ? { hasErrors: true, messageId: msgId, errors: errors }
          : { hasErrors: true, messageId: msgId }
      );
    }
  };
};
