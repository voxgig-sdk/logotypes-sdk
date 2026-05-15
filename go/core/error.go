package core

type LogotypesError struct {
	IsLogotypesError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewLogotypesError(code string, msg string, ctx *Context) *LogotypesError {
	return &LogotypesError{
		IsLogotypesError: true,
		Sdk:              "Logotypes",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *LogotypesError) Error() string {
	return e.Msg
}
