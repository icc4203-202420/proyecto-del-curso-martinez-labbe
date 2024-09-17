class API::V1::AttendancesController < ApplicationController
  respond_to :json

  def create
    # Verifica si ya existe una asistencia para este usuario y evento
    @attendance = Attendance.find_by(user_id: attendance_params[:user_id], event_id: attendance_params[:event_id])

    if @attendance
      # Si ya existe, actualizamos el estado de 'checked_in'
      if @attendance.update(checked_in: attendance_params[:checked_in])
        render json: { message: 'Asistencia actualizada correctamente' }, status: :ok
      else
        render json: { errors: @attendance.errors.full_messages }, status: :unprocessable_entity
      end
    else
      # Si no existe, creamos una nueva asistencia
      @attendance = Attendance.new(attendance_params)
      if @attendance.save
        render json: @attendance, status: :created
      else
        render json: { errors: @attendance.errors.full_messages }, status: :unprocessable_entity
      end
    end
  end

  private

  def attendance_params
    params.require(:attendance).permit(:user_id, :event_id, :checked_in)
  end
end
