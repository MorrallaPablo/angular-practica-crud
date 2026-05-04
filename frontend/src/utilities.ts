import { HttpInterceptorFn } from "@angular/common/http";
import { AbstractControl, FormControl, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";
import { AuthService } from "./app/services/auth-service/auth-service";
import { inject } from "@angular/core";

export function regex (regex: RegExp): ValidatorFn {
    return Validators.pattern(regex);
}

export function isInvalid (control: FormControl): boolean {
    return (control.invalid && (control.touched || control.dirty));
}

export const registrationDateValidator: ValidatorFn = (
  group: AbstractControl
): ValidationErrors | null => {
  const registrationDate = group.get('registrationDate')?.value as string;
  const manufactureYear = group.get('manufactureYear')?.value as number;

  if (!registrationDate || !manufactureYear) return null; 

  const registrationYear = parseInt(registrationDate.slice(0, 4));
  if (Number.isNaN(registrationYear)) return null

  return manufactureYear <= registrationYear
    ? null
    : { registrationDateBeforeManufatureYear: true };
};

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();

  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    })
  }

  return next(req);
}